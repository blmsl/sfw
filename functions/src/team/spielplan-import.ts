import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const deleteMatch = functions.database.ref('/match-fixtures/{season}/{matchNumber}').onDelete((snapshot, context) => {
  console.log(snapshot.val());
  console.log('deleted');
});

export const spielplanCron = functions.database.ref('/match-fixtures/{season}/{matchNumber}').onWrite((snapshot: any, context: any) => {

  const data = snapshot.after.val();

  const seasonTitle = context.params.season.replace('-', '/');
  const firebaseMatchId = context.params.matchNumber;

  if (!data) {
    return true;
  }

  const db = admin.firestore();

  const clubPath: string = 'clubs';
  const seasonPath: string = 'seasons';
  const teamPath: string = 'teams';
  const matchPath: string = 'match-fixtures';
  const locationPath: string = 'locations';
  const categoryPath: string = 'categories';
  const categoryTypePath: string = 'category-types';

  let assignedSeason: string;
  let assignedClub: string;

  let assignedTeamCategoryType: string;
  let assignedLocationCategoryType: string;

  let assignedLocationCategory: string;
  let assignedTeamCategory: string;
  let assignedTeamMainCategory: string = '';

  let assignedLocation: string;
  let assignedTeam: string;

  const locationParts = data.location.split(',');
  const streetAndHouseNumber = locationParts[3].trim();
  const streetSplit = streetAndHouseNumber.split(/(\d+)/g);
  let houseNumber: string = '';
  let street = streetAndHouseNumber.replace(streetSplit[1], '');
  if (street !== streetAndHouseNumber) {
    houseNumber += streetSplit[1];
  }

  if (street.slice(-4) === 'str.') {
    street = street.replace('str.', 'straße');
  }

  const zipAndCounty = locationParts[4].trim();
  const zip = zipAndCounty.slice(0, 5);
  const county = zipAndCounty.slice(6);

  let locationCategoryTitle = '';
  if (locationParts[0].trim().indexOf('Halle') > -1) locationCategoryTitle += 'Hallen';
  if (locationParts[0].trim().indexOf('Hartplatz') > -1) locationCategoryTitle += 'Hartplätze';
  if (locationParts[0].trim().indexOf('Rasenplatz') > -1) locationCategoryTitle += 'Rasenplätze';
  if (locationParts[0].trim().indexOf('Kunstrasenplatz') > -1) locationCategoryTitle += 'Kunstrasenplätze';

  const teamCategoryTitle = data.subject.split(':')[0];

  let isHomeTeam: boolean;

  // Description
  // matchType: Kreisturnier
  // homeTeamName: SG St. Wendel
  // homeTeamExternalTeamLink: http://www.fussball.de/mannschaft/sg-st-wendel-fc-st-wendel-saarland/-/saison/1718/team-id/011MICEETG000000VTVG0001VTR8C1K7
  // homeTeamLogo: //www.fussball.de/export.media/-/action/getLogo/format/2/id/00ES8GNBEO00001DVV0AG08LVUPGND5I
  // guestTeamName: SF Winterbach
  // guestTeamExternalTeamLink:  http://www.fussball.de/mannschaft/sf-winterbach-sf-winterbach-saarland/-/saison/1718/team-id/011MIBO43O000000VTVG0001VTR8C1K7
  // guestTeamLogo: //www.fussball.de/export.media/-/action/getLogo/format/2/id/00ES8GNBEO00001UVV0AG08LVUPGND5I
  // matchLink: http://www.fussball.de/spiel/sf-winterbach-sg-st-wendel/-/spiel/0207HMLG74000000VS54898DVV6E7UIQ
  // isHomeTeam: 0
  // isGuestTeam: 1
  const description = data.description.split('---');
  const matchType = description[0];
  const homeTeam = {
    title: description[1],
    logoURL: description[3],
    externalTeamLink: description[2]
  };
  const guestTeam = {
    title: description[4],
    logoURL: description[6],
    externalTeamLink: description[5]
  };
  const matchLink = description[7];

  return db.collection(seasonPath)
    .where('title', '==', 'Saison ' + seasonTitle)
    .get()
    .then((values: FirebaseFirestore.QuerySnapshot) => {

      let seasonData: any = {
        isImported: true,
        description: 'Alle Informationen zur Saison ' + seasonTitle,
        title: 'Saison ' + seasonTitle
      };

      if (values.empty) {
        assignedSeason = seasonData.id = db.collection(seasonPath).doc().id;
        seasonData.creation = {
          from: 'system',
          at: new Date()
        };
        seasonData.publication = {
          at: '',
          from: '',
          status: ''
        };
        db.collection(seasonPath).doc(assignedSeason).set(seasonData);
      } else {
        values.docs[0].ref.set(seasonData, { merge: true });
        assignedSeason = values.docs[0].id;
      }
      return true;
    }).then(() => {
      // Location-CategoryType
      return db.collection(categoryTypePath)
        .where('link', '==', 'location.types')
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          let categoryTypeData: any = {
            link: 'location.types'
          };

          if (values.empty) {
            assignedLocationCategoryType = categoryTypeData.id = db.collection(categoryTypePath).doc().id;
            categoryTypeData.creation = {
              from: 'system',
              at: new Date()
            };
            db.collection(categoryTypePath).doc(assignedLocationCategoryType).set(categoryTypeData);
          } else {
            values.docs[0].ref.set(categoryTypeData, { merge: true });
            assignedLocationCategoryType = values.docs[0].id;
          }
        });
    }).then(() => {
      // Team-CategoryType
      return db.collection(categoryTypePath)
        .where('link', '==', 'team.types')
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          let categoryTypeData: any = {
            link: 'team.types'
          };

          // CategoryType
          if (values.empty) {
            assignedTeamCategoryType = categoryTypeData.id = db.collection(categoryTypePath).doc().id;
            categoryTypeData.creation = {
              from: 'system',
              at: new Date()
            };
            db.collection(categoryTypePath).doc(assignedTeamCategoryType).set(categoryTypeData);
          } else {
            values.docs[0].ref.set(categoryTypeData, { merge: true });
            assignedTeamCategoryType = values.docs[0].id;
          }
        });
    }).then(() => {
      // Location-Category
      return db.collection(categoryPath)
        .where('title', '==', locationCategoryTitle)
        .where('assignedCategoryType', '==', assignedLocationCategoryType)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          let categoryData: any = {
            title: locationCategoryTitle,
            assignedCategoryType: assignedLocationCategoryType,
            description: 'Alle erfassten ' + locationCategoryTitle + ' in der Region'
          };

          if (values.empty) {
            assignedLocationCategory = categoryData.id = db.collection(categoryPath).doc().id;
            categoryData.creation = {
              from: 'system',
              at: new Date()
            };
            db.collection(categoryPath).doc(assignedLocationCategory).set(categoryData);
          }
          else {
            values.docs[0].ref.set(categoryData, { merge: true });
            assignedLocationCategory = values.docs[0].id;
          }
        });
    }).then(() => {
      // Team-Category
      return db.collection(categoryPath)
        .where('title', '==', teamCategoryTitle)
        .where('assignedCategoryType', '==', assignedTeamCategoryType)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          let categoryData: any = {
            title: teamCategoryTitle,
            assignedCategoryType: assignedTeamCategoryType,
            description: 'Alle erfassten ' + teamCategoryTitle
          };

          if (values.empty) {
            assignedTeamCategory = categoryData.id = db.collection(categoryPath).doc().id;
            categoryData.creation = {
              from: 'system',
              at: new Date()
            };
            db.collection(categoryPath).doc(assignedTeamCategory).set(categoryData);
          }
          else {
            values.docs[0].ref.set(categoryData, { merge: true });
            assignedTeamCategory = values.docs[0].id;
          }
        });
    }).then(() => {
      // Other-Team-Categories
      let assignedTeamMainCategoryTitle: string;
      if (teamCategoryTitle.indexOf('Junioren') > -1) {
        assignedTeamMainCategoryTitle = 'Junioren';
      } else if (teamCategoryTitle.indexOf('Altherren') > -1) {
        assignedTeamMainCategoryTitle = 'Altherren';
      } else if (teamCategoryTitle.indexOf('Frauen') > -1) {
        assignedTeamMainCategoryTitle = 'Frauen';
      } else {
        assignedTeamMainCategoryTitle = 'Herren';
      }

      return db.collection(categoryPath)
        .where('title', '==', assignedTeamMainCategoryTitle)
        .where('assignedCategoryType', '==', assignedTeamCategoryType)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          let categoryData: any = {
            title: assignedTeamMainCategoryTitle,
            assignedCategoryType: assignedTeamCategoryType,
            description: 'Alle erfassten ' + assignedTeamMainCategoryTitle + ' Mannschaften'
          };

          if (values.empty) {
            assignedTeamMainCategory = categoryData.id = db.collection(categoryPath).doc().id;
            categoryData.creation = {
              from: 'system',
              at: new Date()
            };
            db.collection(categoryPath).doc(assignedTeamMainCategory).set(categoryData);
          }
          else {
            values.docs[0].ref.set(categoryData, { merge: true });
            assignedTeamMainCategory = values.docs[0].id;
          }
        });

    }).then(() => {
      // Location
      return db.collection(locationPath)
        .where('title', '==', locationParts[0] + ' ' + locationParts[1])
        .where('assignedCategory', '==', assignedLocationCategory)
        .where('address.county', '==', county)
        .where('address.city', '==', locationParts[1])
        .where('address.zip', '==', zip)
        .where('address.streetName', '==', street)
        .where('address.houseNumber', '==', houseNumber)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          let locationData: any = {
            isImported: true,
            title: locationParts[0] + ' ' + locationParts[1],
            assignedCategory: assignedLocationCategory,
            address: {
              city: locationParts[1],
              zip: zip,
              streetName: street,
              houseNumber: houseNumber,
              county: county
            },
          };

          if (values.empty) {
            assignedLocation = locationData.id = db.collection(locationPath).doc().id;
            locationData.creation = {
              from: 'system',
              at: new Date()
            };
            db.collection(locationPath).doc(assignedLocation).set(locationData);
          }
          else {
            values.docs[0].ref.set(locationData, { merge: true });
            assignedLocation = values.docs[0].id;
          }
        });
    }).then(() => {
      let clubName: string = '';
      const homeOrGuestSplit = data.description.split('---|---');
      isHomeTeam = homeOrGuestSplit[1] === '';

      let clubNameTest = isHomeTeam ? description[1] : description[4];
      if (clubNameTest.indexOf('Winterbach') > -1 || (clubNameTest.indexOf('Bliesen') > -1 && teamCategoryTitle.indexOf('Junioren') > -1)) {
        clubName += 'SF Winterbach';
      } else {
        console.error(clubName);
        return;
      }
      // Club
      return db.collection(clubPath)
        .where('title', '==', clubName)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          let clubData: any = {
            title: clubName,
            logoURL: isHomeTeam ? description[3] : description[6]
          };

          // CategoryType
          if (values.empty) {
            assignedClub = clubData.id = db.collection(clubPath).doc().id;
            clubData.fussballde = {
              clubId: '',
              clubUrl: ''
            };
            clubData.creation = {
              from: 'system',
              at: new Date()
            };
            clubData.timeLine = [];
            clubData.info = {
              founding: '',
              clubColours: '',
              assignedContact: '',
              website: '',
            };
            clubData.management = {
              positions: [],
              photoUrl: '',
              photoDescription: '',
              timeLine: []
            };
            db.collection(clubPath).doc(assignedClub).set(clubData);
          } else {
            values.docs[0].ref.set(clubData, { merge: true });
            assignedClub = values.docs[0].id;
          }
        });
    }).then(() => {
      let subTitle = isHomeTeam ? description[1] : description[4];
      const lastFourChars = subTitle.slice(-4);
      const lastChar = subTitle.slice(-1);

      // delete a.W.
      if (lastFourChars === 'a.W.') {
        subTitle = subTitle.slice(0, -5);
      }

      if (lastChar === '1') {
        subTitle = subTitle.slice(0, -2);
      }

      if (((subTitle.indexOf('Winterbach') > -1) || subTitle.indexOf('Bliesen') > -1) && subTitle.indexOf('SG') > -1 && teamCategoryTitle.indexOf('Junioren') > -1) {
        subTitle = 'SG SF Winterbach';
      }

      // Team
      return db.collection(teamPath)
        .where('title', '==', teamCategoryTitle)
        .where('assignedClub', '==', assignedClub)
        .where('subTitle', '==', subTitle)
        .where('assignedSeason', '==', assignedSeason)
        //.where('externalTeamLink', '==', isHomeTeam ? description[2] : description[5])
        //.where('logoURL', '==', isHomeTeam ? description[3] : description[6])
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          let teamData: any = {
            title: teamCategoryTitle,
            subTitle: subTitle,
            assignedSeason: assignedSeason,
            isOfficialTeam: true,
            assignedClub: assignedClub,
            assignedTeamCategories: assignedTeamCategory !== assignedTeamMainCategory ? [assignedTeamCategory, assignedTeamMainCategory] : [assignedTeamCategory]
          };

          if (values.empty) {
            assignedTeam = teamData.id = db.collection(teamPath).doc().id;
            teamData.externalTeamLink = isHomeTeam ? description[2] : description[5];
            teamData.logoURL = isHomeTeam ? description[3] : description[6];
            teamData.assignedPlayers = [];
            teamData.assignedPositions = [];
            teamData.assignedTrainings = [];
            teamData.assignedCompetitions = [];
            teamData.assignedEvents = [];
            teamData.creation = {
              from: 'system',
              at: new Date()
            };
            db.collection(teamPath).doc(teamData.id).set(teamData);
          }
          else {
            values.docs[0].ref.set(teamData, { merge: true });
            assignedTeam = values.docs[0].id;
          }
        });
    }).then(() => {
      // Match
      return db.collection(matchPath)
        .where('homeTeam', '==', homeTeam)
        .where('guestTeam', '==', guestTeam)
        .where('startDate', '==', data.startDate)
        .where('endDate', '==', data.endDate)
        .where('assignedLocation', '==', assignedLocation)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          let matchData: any = {
            title: data.subject,
            isImported: true,
            isOfficialMatch: true,
            isHomeTeam: isHomeTeam,
            assignedTeamCategory: assignedTeamCategory,
            assignedTeam: assignedTeam,
            homeTeam: homeTeam,
            guestTeam: guestTeam,
            matchLink: matchLink,
            matchType: matchType,
            startDate: data.startDate,
            endDate: data.endDate,
            assignedLocation: assignedLocation,
            assignedFireBaseMatch: firebaseMatchId
          };

          if (values.empty) {
            matchData.id = db.collection(matchPath).doc().id;
            matchData.creation = {
              from: 'system',
              at: new Date()
            };
            matchData.result = {
              otherEvent: '',
              homeTeamGoals: '',
              guestTeamGoals: ''
            };
            return db.collection(matchPath).doc(matchData.id).set(matchData);
          }
          else {
            return values.docs[0].ref.set(matchData, { merge: true });
          }
        });

    }).catch((error: any) => console.error(error));

});
