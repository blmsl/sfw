import * as functions from 'firebase-functions';

export const sendNotificationNewMatch = functions.database.ref('/matches/{matchId}').onCreate((change) => {

  let data = change.val();

  if (!data) {
    return true;
  }

  console.log('Updated match');
  console.log(data.value);

  /* const message = {
    notification: {
      title: 'Neues Spiel: ',
      body: `New match created:`
    }
  };

  sgMail.send({
        to: [
          'thomas.handle@gmail.com',
          // 'mail@r-klein.com',
          // 'nathalie.feller@gmx.de',
          // 'ronnyhassel@gmail.com'
        ],
        from: 'Spielplan@sfwinterbach.com',
        subject: notification.title,
        templateId: '3b21edd6-0c49-40c2-a2e3-68ae679ff440',
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
          adminName: '',
          birthdayList: list,
          dateString: moment().format("LL")
        }
      });
  */
  return true;
});
