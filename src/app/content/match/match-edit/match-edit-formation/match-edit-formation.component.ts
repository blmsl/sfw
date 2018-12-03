import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IFormation } from '../../../../shared/interfaces/match/formation.interface';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { MatchFormationService } from '../../../../shared/services/match/match-formation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, first } from 'rxjs/internal/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ICoord } from '../../../../shared/interfaces/match/coord.interface';
import { MatSelectChange } from '@angular/material';
import { MemberService } from '../../../../shared/services/member/member.service';
import { Observable, of } from 'rxjs/index';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'match-edit-formation',
  templateUrl: './match-edit-formation.component.html',
  styleUrls: ['./match-edit-formation.component.scss']
})
export class MatchEditFormationComponent implements OnInit {

  @Input() assignedTeamPlayers: IMember[];
  @Input() match: IMatch;
  @Output() saveMatch: EventEmitter<IMatch> = new EventEmitter<IMatch>(false);

  private emptyMember: IMember;

  public emptyMemberImage: Observable<IMediaItem>;
  public tacticalFormations: IFormation[];
  public form: FormGroup;
  public thirty: IMember[][];
  public playerPositions: ICoord[];
  public substitutes: IMember[];

  items = ['Zero', 'One', 'Two', 'Three'];
  fieldDropListIds = ['0', '1', '2', '3', '4', '5'];
  dropListIds = [...this.fieldDropListIds, 'substitutions'];
  playerList = [];

  constructor(private matchFormationService: MatchFormationService,
              private memberService: MemberService,
              private fb: FormBuilder) {
    this.tacticalFormations = matchFormationService.getFormations();
    this.memberService.setNewMember().pipe(first()).subscribe((member: IMember) =>
      this.emptyMember = Object.assign({}, member));
    this.substitutes = [];
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedFormation: this.match.assignedFormation
    });

    this.assignedTeamPlayers = [
      {
        'address': {
          'city': 'St. Wendel',
          'streetName': 'Fichtenstraße'
        },
        'ahData': {
          'joined': '',
          'left': '',
          'status': 0
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '2017-07-03',
          'left': '',

          'positionsInClub': '',
          'status': 4
        },
        'contact': {
          'email': '',
          'phoneHome': '',
          'phoneMobile': ''
        },
        'creationAt': {
          'seconds': 1541710411,
          'nanoseconds': 339000000
        },
        'creationBy': 'system',
        'dfbData': {
          'ageGroup': 'C-Junioren (U14/U15)',
          'allowedToPlay': 'einsetzbar',
          'eligibleForFriendlyMatches': '2017-08-16',
          'eligibleForOfficialMatches': '2017-08-16',
          'guestPlayer': {
            'guestRight': '',
            'season': '',
            'type': ''
          },
          'passNumber': '0490-9334',
          'passPrint': '2017-08-21',

          'signOut': ''
        },
        'dfbImport': true,
        'driveImport': true,
        'id': 'fe6d02927590482d84f7',

        'mainData': {
          'birthday': {
            'day': '10',
            'full': '2004-02-10',
            'month': '02',
            'monthDay': '02-10',
            'year': '2004'
          },
          'firstName': 'Daniil',
          'gender': 'male',
          'lastName': 'Avram',
          'title': ''
        },
        'title': 'Avram Daniil'
      },
      {
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de'
        },
        'creationAt': {
          'seconds': 1541710411,
          'nanoseconds': 339000000
        },
        'creationBy': 'system',
        'dfbData': {
          'ageGroup': 'Senioren',
          'allowedToPlay': 'einsetzbar',
          'eligibleForFriendlyMatches': '1976-01-15',
          'eligibleForOfficialMatches': '1976-01-15',
          'guestPlayer': {
            'guestRight': '',
            'season': '',
            'type': ''
          },
          'passNumber': '144258',
          'passPrint': '',

          'signOut': ''
        },
        'dfbImport': true,
        'driveImport': true,
        'id': 'fe70a71ade9b47a58328',

        'mainData': {
          'birthday': {
            'day': '15',
            'full': '1970-06-15',
            'month': '06',
            'monthDay': '06-15',
            'year': '1970'
          },
          'firstName': 'Thomas',
          'gender': 'male',
          'lastName': 'Cremer'
        },
        'title': 'Cremer Thomas'
      },
      {
        'address': {
          'city': 'Oberthal',
          'streetName': 'Neunkirchenerstraße'
        },
        'ahData': {
          'joined': '',
          'left': '',

          'status': 1
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',

          'positionsInClub': '',
          'status': 0
        },
        'contact': {
          'email': 'mutsch2000@t-online.de',
          'phoneHome': '06854-7574',
          'phoneMobile': ''
        },
        'creationAt': {
          'seconds': 1541710738,
          'nanoseconds': 341000000
        },
        'creationBy': 'system',
        'driveImport': true,
        'dfbImport': true,
        'id': 'fe85a59646244b87bf74',

        'mainData': {
          'birthday': {
            'day': '01',
            'full': '1956-02-01',
            'month': '02',
            'monthDay': '02-01',
            'year': '1956'
          },
          'firstName': 'Kurt',
          'gender': 'male',
          'lastName': 'Meisberger',
          'title': ''
        },
        'title': 'Meisberger Kurt'
      },
      {
        'address': {
          'city': 'St. Wendel',
          'houseNumber': 17,
          'streetName': 'Mechersstraße'
        },
        'ahData': {
          'joined': '',
          'left': '',

          'status': 2
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',

          'positionsInClub': '',
          'status': 2
        },
        'contact': {
          'email': '',
          'phoneHome': '06851-2955',
          'phoneMobile': ''
        },
        'creationAt': {
          'seconds': 1541710411,
          'nanoseconds': 339000000
        },
        'creationBy': 'system',
        'dfbData': {
          'ageGroup': 'Senioren',
          'allowedToPlay': 'einsetzbar',
          'eligibleForFriendlyMatches': '1968-04-23',
          'eligibleForOfficialMatches': '1968-04-23',
          'guestPlayer': {
            'guestRight': '',
            'season': '',
            'type': ''
          },
          'passNumber': '144554',
          'passPrint': '',

          'signOut': ''
        },
        'dfbImport': true,
        'driveImport': true,
        'id': 'feaf070aa1814c21b703',

        'mainData': {
          'birthday': {
            'day': '24',
            'full': '1939-10-24',
            'month': '10',
            'monthDay': '10-24',
            'year': '1939'
          },
          'firstName': 'Urban',
          'gender': 'male',
          'lastName': 'Gessner',
          'title': ''
        },
        'title': 'Gessner Urban'
      },
      {
        'address': {
          'city': 'Tholey - Hasborn',
          'streetName': 'Parkstraße'
        },
        'ahData': {
          'joined': '',
          'left': '',

          'status': 1
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',

          'positionsInClub': '',
          'status': 1
        },
        'contact': {
          'email': 'k.wgn@gmx.de',
          'phoneHome': '',
          'phoneMobile': '0176-60012341'
        },
        'creationAt': {
          'seconds': 1541710411,
          'nanoseconds': 339000000
        },
        'creationBy': 'system',
        'dfbData': {
          'ageGroup': 'Senioren',
          'allowedToPlay': 'einsetzbar',
          'eligibleForFriendlyMatches': '2015-08-22',
          'eligibleForOfficialMatches': '2015-08-22',
          'guestPlayer': {
            'guestRight': '',
            'season': '',
            'type': ''
          },
          'passNumber': '0268-6556',
          'passPrint': '2015-08-26',

          'signOut': ''
        },
        'dfbImport': true,
        'driveImport': true,
        'id': 'ff06c70b853f4af28910',

        'mainData': {
          'birthday': {
            'day': '18',
            'full': '1983-03-18',
            'month': '03',
            'monthDay': '03-18',
            'year': '1983'
          },
          'firstName': 'Kai',
          'gender': 'male',
          'lastName': 'Wagner',
          'title': ''
        },
        'title': 'Wagner Kai'
      },
      {
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de'
        },
        'creationAt': {
          'seconds': 1541710411,
          'nanoseconds': 339000000
        },
        'creationBy': 'system',
        'dfbData': {
          'ageGroup': 'Senioren',
          'allowedToPlay': 'einsetzbar',
          'eligibleForFriendlyMatches': '1999-04-23',
          'eligibleForOfficialMatches': '1999-04-23',
          'guestPlayer': {
            'guestRight': '',
            'season': '',
            'type': ''
          },
          'passNumber': '1151714',
          'passPrint': '',

          'signOut': ''
        },
        'dfbImport': true,
        'driveImport': true,
        'id': 'ff7f9def99254a71bb85',

        'mainData': {
          'birthday': {
            'day': '22',
            'full': '1972-01-22',
            'month': '01',
            'monthDay': '01-22',
            'year': '1972'
          },
          'firstName': 'Rudi',
          'gender': 'male',
          'lastName': 'Latz'
        },
        'title': 'Latz Rudi'
      },
      {
        'address': {
          'city': 'St. Wendel',
          'streetName': 'Frankenstraße'
        },
        'ahData': {
          'joined': '',
          'left': '',
          'status': 1
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',
          'positionsInClub': '',
          'status': 1
        },
        'contact': {
          'email': 'enzoarnu@googlemail.com',
          'phoneHome': '06851-6722',
          'phoneMobile': '0173-1520161'
        },
        'creationAt': {
          'seconds': 1541710411,
          'nanoseconds': 339000000
        },
        'creationBy': 'system',
        'dfbData': {
          'ageGroup': 'Senioren',
          'allowedToPlay': 'einsetzbar',
          'eligibleForFriendlyMatches': '1999-01-26',
          'eligibleForOfficialMatches': '1999-03-06',
          'guestPlayer': {
            'guestRight': '',
            'season': '',
            'type': ''
          },
          'passNumber': '1150171',
          'passPrint': '',
          'signOut': ''
        },
        'dfbImport': true,
        'driveImport': true,
        'id': 'fff83dc2131c4facb614',

        'mainData': {
          'birthday': {
            'day': '16',
            'full': '1966-01-16',
            'month': '01',
            'monthDay': '01-16',
            'year': '1966'
          },
          'firstName': 'Christian',
          'gender': 'male',
          'lastName': 'Arnu',
          'title': ''
        },
        'title': 'Arnu Christian'
      },
      {
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de'
        },
        'creationAt': {
          'seconds': 1541710411,
          'nanoseconds': 339000000
        },
        'creationBy': 'system',
        'dfbData': {
          'ageGroup': 'Senioren',
          'allowedToPlay': 'einsetzbar',
          'eligibleForFriendlyMatches': '2004-09-06',
          'eligibleForOfficialMatches': '2004-09-06',
          'guestPlayer': {
            'guestRight': '',
            'season': '',
            'type': ''
          },
          'passNumber': '1216973',
          'passPrint': '',
          'signOut': ''
        },
        'dfbImport': true,
        'driveImport': true,
        'id': 'fe08efc8ed0b4a3298d8',
        'mainData': {
          'birthday': {
            'day': '14',
            'full': '1998-05-14',
            'month': '05',
            'monthDay': '05-14',
            'year': '1998'
          },
          'firstName': 'Eric',
          'gender': 'male',
          'lastName': 'Ohliger'
        },
        'title': 'Ohliger Eric'
      },
      {
        'address': {
          'city': 'St. Wendel',
          'houseNumber': 6,
          'streetName': 'Am Zwinger',
          'zip': 66606
        },
        'ahData': {
          'joined': '',
          'left': '',
          'status': 0
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',
          'positionsInClub': '',
          'status': 1
        },
        'contact': {
          'email': 'riefer.max@gmail.com',
          'phoneHome': '',
          'phoneMobile': ''
        },
        'creationAt': {
          'seconds': 1541710411,
          'nanoseconds': 339000000
        },
        'creationBy': 'system',
        'dfbData': {
          'ageGroup': 'Senioren',
          'allowedToPlay': 'einsetzbar',
          'eligibleForFriendlyMatches': '1993-08-24',
          'eligibleForOfficialMatches': '1993-08-24',
          'guestPlayer': {
            'guestRight': '',
            'season': '',
            'type': ''
          },
          'passNumber': '186500',
          'passPrint': '',
          'signOut': ''
        },
        'dfbImport': true,
        'driveImport': true,
        'id': 'fe2b1ec28f36411b879b',
        'mainData': {
          'birthday': {
            'day': '22',
            'full': '1988-05-22',
            'month': '05',
            'monthDay': '05-22',
            'year': '1988'
          },
          'firstName': 'Maximilian',
          'gender': 'male',
          'lastName': 'Riefer',
          'title': ''
        },
        'title': 'Riefer Maximilian'
      },
      {
        'address': {
          'city': 'St. Wendel',

          'streetName': 'Wellwiesstraße'

        },
        'ahData': {
          'joined': '',
          'left': '',

          'status': 0
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',
          'positionsInClub': '',
          'status': 1
        },
        'contact': {
          'email': 'jprusac@web.de',
          'phoneHome': '06851-85437',
          'phoneMobile': ''
        },
        'creationAt': {
          'seconds': 1541710411,
          'nanoseconds': 339000000
        },
        'creationBy': 'system',
        'dfbData': {
          'ageGroup': 'Senioren',
          'allowedToPlay': 'einsetzbar',
          'eligibleForFriendlyMatches': '1996-02-08',
          'eligibleForOfficialMatches': '1996-02-08',
          'guestPlayer': {
            'guestRight': '',
            'season': '',
            'type': ''
          },
          'passNumber': '1113668',
          'passPrint': '',

          'signOut': ''
        },
        'dfbImport': true,
        'driveImport': true,
        'id': 'fbf7d88fd0634fc1be25',

        'mainData': {
          'birthday': {
            'day': '27',
            'full': '1989-10-27',
            'month': '10',
            'monthDay': '10-27',
            'year': '1989'
          },
          'firstName': 'Jasmin',
          'gender': 'male',
          'lastName': 'Prusac',
          'title': ''
        },

        'title': 'Prusac Jasmin'
      },
      {
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de'
        },
        'creationAt': {
          'seconds': 1541710411,
          'nanoseconds': 339000000
        },
        'creationBy': 'system',
        'dfbData': {
          'ageGroup': 'Senioren',
          'allowedToPlay': 'einsetzbar',
          'eligibleForFriendlyMatches': '2011-12-06',
          'eligibleForOfficialMatches': '2011-12-06',
          'guestPlayer': {
            'guestRight': '',
            'season': '',
            'type': ''
          },
          'passNumber': '0295-0290',
          'passPrint': '2011-12-06',

          'signOut': ''
        },
        'dfbImport': true,
        'driveImport': true,
        'id': 'fca38334a52f4f348bed',

        'mainData': {
          'birthday': {
            'day': '05',
            'full': '1997-08-05',
            'month': '08',
            'monthDay': '08-05',
            'year': '1997'
          },
          'firstName': 'Jerom',
          'gender': 'male',
          'lastName': 'Ahr'
        },

        'title': 'Ahr Jerom'
      },
      {
        'address': {
          'city': 'Winterbach',

          'streetName': 'Seitersstraße'

        },
        'ahData': {
          'joined': '',
          'left': '',

          'status': 1
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',

          'positionsInClub': '',
          'status': 0
        },
        'contact': {
          'email': 'alrup@web.de',
          'phoneHome': '06851-81322',
          'phoneMobile': '0151 17829556'
        },
        'creationAt': {
          'seconds': 1541710738,
          'nanoseconds': 341000000
        },
        'creationBy': 'system',
        'driveImport': true,
        'dfbImport': true,
        'id': 'fcbc389930274950b73d',

        'mainData': {
          'birthday': {
            'day': '16',
            'full': '1953-12-16',
            'month': '12',
            'monthDay': '12-16',
            'year': '1953'
          },
          'firstName': 'Albert',
          'gender': 'male',
          'lastName': 'Rupp',
          'title': ''
        },

        'title': 'Rupp Albert'
      },
      {
        'address': {
          'city': 'St. Wendel',

          'streetName': 'Zum Domweiher'

        },
        'ahData': {
          'joined': '',
          'left': '',

          'status': 1
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',

          'positionsInClub': '',
          'status': 1
        },
        'contact': {
          'email': 'pulverlady@gmx.de',
          'phoneHome': '06851-4694',
          'phoneMobile': ''
        },
        'creationAt': {
          'seconds': 1541710738,
          'nanoseconds': 341000000
        },
        'creationBy': 'system',
        'driveImport': true,
        'dfbImport': true,
        'id': 'fd8fcb45f1a44fc38a00',

        'mainData': {
          'birthday': {
            'day': '16',
            'full': '1949-10-16',
            'month': '10',
            'monthDay': '10-16',
            'year': '1949'
          },
          'firstName': 'Bernd',
          'gender': 'male',
          'lastName': 'Wolferstedter',
          'title': ''
        },

        'title': 'Wolferstedter Bernd'
      },
      {
        'address': {
          'city': 'St. Wendel',

          'streetName': 'Zum Domweiher'

        },
        'ahData': {
          'joined': '',
          'left': '',

          'status': 1
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',

          'positionsInClub': '',
          'status': 1
        },
        'contact': {
          'email': 'pulverlady@gmx.de',
          'phoneHome': '06851-4694',
          'phoneMobile': ''
        },
        'creationAt': {
          'seconds': 1541710738,
          'nanoseconds': 341000000
        },
        'creationBy': 'system',
        'driveImport': true,
        'dfbImport': true,
        'id': 'fd8fcb45f1a44fc38a00',

        'mainData': {
          'birthday': {
            'day': '16',
            'full': '1949-10-16',
            'month': '10',
            'monthDay': '10-16',
            'year': '1949'
          },
          'firstName': 'Bernd',
          'gender': 'male',
          'lastName': 'Wolferstedter',
          'title': ''
        },

        'title': 'Wolferstedter Bernd'
      },
      {
        'address': {
          'city': 'St. Wendel',

          'streetName': 'Zum Domweiher'

        },
        'ahData': {
          'joined': '',
          'left': '',

          'status': 1
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',

          'positionsInClub': '',
          'status': 1
        },
        'contact': {
          'email': 'pulverlady@gmx.de',
          'phoneHome': '06851-4694',
          'phoneMobile': ''
        },
        'creationAt': {
          'seconds': 1541710738,
          'nanoseconds': 341000000
        },
        'creationBy': 'system',
        'driveImport': true,
        'dfbImport': true,
        'id': 'fd8fcb45f1a44fc38a00',

        'mainData': {
          'birthday': {
            'day': '16',
            'full': '1949-10-16',
            'month': '10',
            'monthDay': '10-16',
            'year': '1949'
          },
          'firstName': 'Bernd',
          'gender': 'male',
          'lastName': 'Wolferstedter',
          'title': ''
        },

        'title': 'Wolferstedter Bernd'
      },
      {
        'address': {
          'city': 'St. Wendel',

          'streetName': 'Zum Domweiher'

        },
        'ahData': {
          'joined': '',
          'left': '',

          'status': 1
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',

          'positionsInClub': '',
          'status': 1
        },
        'contact': {
          'email': 'pulverlady@gmx.de',
          'phoneHome': '06851-4694',
          'phoneMobile': ''
        },
        'creationAt': {
          'seconds': 1541710738,
          'nanoseconds': 341000000
        },
        'creationBy': 'system',
        'driveImport': true,
        'dfbImport': true,
        'id': 'fd8fcb45f1a44fc38a00',

        'mainData': {
          'birthday': {
            'day': '16',
            'full': '1949-10-16',
            'month': '10',
            'monthDay': '10-16',
            'year': '1949'
          },
          'firstName': 'Bernd',
          'gender': 'male',
          'lastName': 'Wolferstedter',
          'title': ''
        },

        'title': 'Wolferstedter Bernd'
      },
      {
        'address': {
          'city': 'St. Wendel',

          'streetName': 'Zum Domweiher'

        },
        'ahData': {
          'joined': '',
          'left': '',

          'status': 1
        },
        'clubData': {
          'assignedClub': '23f95e43c79f4bdba8de',
          'joined': '',
          'left': '',

          'positionsInClub': '',
          'status': 1
        },
        'contact': {
          'email': 'pulverlady@gmx.de',
          'phoneHome': '06851-4694',
          'phoneMobile': ''
        },
        'creationAt': {
          'seconds': 1541710738,
          'nanoseconds': 341000000
        },
        'creationBy': 'system',
        'driveImport': true,
        'dfbImport': true,
        'id': 'fd8fcb45f1a44fc38a00',

        'mainData': {
          'birthday': {
            'day': '16',
            'full': '1949-10-16',
            'month': '10',
            'monthDay': '10-16',
            'year': '1949'
          },
          'firstName': 'Bernd',
          'gender': 'male',
          'lastName': 'Wolferstedter',
          'title': ''
        },

        'title': 'Wolferstedter Bernd'
      }
    ];


    if (this.match.assignedFormation) {
      this.setPlayerPositions(this.match.assignedFormation);
      this.initializeFieldPositions();
    }

    this.emptyMemberImage = of({
      downloadURL: '/assets/sfw/placeholder/avatar_male.jpg'
    });


    this.form.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((changes: IMatch) => {
      if (this.form.valid) {
        this.saveMatch.emit(changes);
      }
    });
  }

  changeFormation($event: MatSelectChange) {
    this.setPlayerPositions($event.value);
    this.initializeFieldPositions();
  }

  setPlayerPositions(formationTitle: string) {

    const formation = this.tacticalFormations.find((detailFormation: IFormation) => {
      return detailFormation.title === formationTitle;
    });
    this.playerPositions = this.matchFormationService.getFormationPositions(formation);
  }

  initializeFieldPositions() {
    this.thirty = [];

    for (const i of [...Array(6)]) {
      const row: IMember[] = [];
      for (const j of [...Array(5)]) {
        row.push(Object.assign({}, this.emptyMember));
      }
      this.thirty.push(row);
    }
  }

  checkCoordinates(x: number, y: number): boolean {
    for (const p of this.playerPositions) {
      if (p.x === x && Math.abs(p.y - 4) === y) {
        return true;
      }
    }

    return false;
  }

  updatePositionList(x: number, y: number, newMember: IMember, list: IMember[]) {
    // ensures that the drag will be successful when the item is dropped before or after the placeholder
    const positionBeforePlaceholder: boolean = this.checkCoordinates(x, y);
    const positionAfterPlaceholder: boolean = this.checkCoordinates(x, y - 1);

    const correctIdx: number = positionBeforePlaceholder ? y : positionAfterPlaceholder ? y - 1 : -1;

    if (correctIdx === -1) {
      return list;
    }

    return list.map((member: IMember, memberIndex: number) => {
      if (memberIndex === correctIdx) {
        return newMember;
      }
      return member;
    });
  }


  addToStartingEleven(event: CdkDragDrop<string[]>) {
    const x = Number.parseInt(event.container.id, 10);
    return this.thirty.map((element: IMember[], index: number) => {
      if (index === x) {
        return this.updatePositionList(x, event.currentIndex, event.item.data, element);
      }
      return element;
    });
  }

  replaceInStartingEleven(event: CdkDragDrop<string[]>) {
    const x = Number.parseInt(event.container.id, 10);
    const prevX = Number.parseInt(event.previousContainer.id, 10);
    return this.thirty.map((element: IMember[], index: number) => {
      if (index === x) {
        return this.updatePositionList(x, event.currentIndex, event.item.data, element);
      } else if (index === prevX) {
        return this.updatePositionList(prevX, event.previousIndex, Object.assign({}, this.emptyMember), element);
      }
      return element;
    });
  }

  removeFromStartingEleven(event: CdkDragDrop<string[]>) {
    const prevX = Number.parseInt(event.previousContainer.id, 10);

    return this.thirty.map((element: IMember[], index: number) => {
      if (index === prevX) {
        return this.updatePositionList(prevX, event.previousIndex, Object.assign({}, this.emptyMember), element);
      }
      return element;
    });
  }

  equals(matrix1: IMember[][], matrix2: IMember[][]): boolean {
    return matrix1.every((arr: [], i: number) => arr.every((el: IMember, j: number) => matrix2[i][j].id === el.id));
  }

  drop(event: CdkDragDrop<string[]>) {

    if (this.fieldDropListIds.includes(event.container.id) && this.fieldDropListIds.includes(event.previousContainer.id)) {
      // handles drag inside the soccer field
      this.thirty = this.replaceInStartingEleven(event);

    } else if (event.previousContainer.id !== event.container.id) {

      if (this.fieldDropListIds.includes(event.container.id)) {
        // target is the soccer field -> delete from the previous container if successful
        const updatedField = this.addToStartingEleven(event);

        if (!this.equals(updatedField, this.thirty)){
          this.thirty = this.addToStartingEleven(event);
          event.previousContainer.data.splice(event.previousIndex, 1);
        }

      } else if (this.fieldDropListIds.includes(event.previousContainer.id)) {
        // drag from the soccer field to the other lists
        this.thirty = this.removeFromStartingEleven(event);
        event.container.data.splice(event.currentIndex, 0, event.previousContainer.data[event.previousIndex]);

      } else {
        // drag from the initial list to the substitutes list
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    } else {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /*
   getMaxSubstitutes(assignedFormationTitle: string, substitutionList: string[]) {
   const substitutionListLength = substitutionList ? substitutionList.length : 0;
   const maxSubstitutes = this.tacticalFormations.filter((formation: IFormation) => {
   return formation.title === assignedFormationTitle;
   });
   return maxSubstitutes.length === 0
   ? []
   : new Array(maxSubstitutes[ 0 ].maxSubstitutes - substitutionListLength).fill(0).map((_, i) => i);
   } */
}
