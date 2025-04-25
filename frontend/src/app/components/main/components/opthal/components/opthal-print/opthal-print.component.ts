import { Component, ViewEncapsulation } from '@angular/core';
import { PrintService } from 'src/app/core/services';

@Component({
  selector: 'app-opthal-print',
  templateUrl: './opthal-print.component.html',
  styleUrls: ['./opthal-print.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OpthalPrintComponent {
data = {
  "sectionForms": [
      {
          "title": "Vision Refraction 👁️",
          "data": {
              "distance": {
                  "reSph": "Modi incididunt quos",
                  "reCyl": "Non irure unde ducim",
                  "reAxis": "Id maxime omnis moll",
                  "reVision": "Sint excepturi ut e",
                  "leSph": "Quia sunt similique",
                  "leCyl": "Molestiae perferendi",
                  "leAxis": "Qui pariatur Et qua",
                  "leVision": "Omnis alias rerum es"
              },
              "near": {
                  "reSph": "Aliquip voluptatem ",
                  "reCyl": "Veniam enim laborum",
                  "reAxis": "Omnis voluptate et a",
                  "reVision": "Architecto qui ipsam",
                  "leSph": "At eaque velit autem",
                  "leCyl": "Quia expedita lorem ",
                  "leAxis": "Voluptatem optio se",
                  "leVision": "Laudantium tempora "
              },
              "add": {
                  "be": "Fugiat ut ex labore ",
                  "re": "Aut distinctio Est ",
                  "le": "Non at laudantium i"
              },
              "glassDetails": {
                  "type": "Do aut velit in aut ",
                  "color": "Rerum asperiores vol",
                  "use": "Sit dolore adipisci",
                  "pd": "Et voluptatum aliqui"
              }
          }
      },
      {
          "title": "Visual Aquity 👁️",
          "data": {
              "distanceVision": {
                  "reDV": "Neque in pariatur E",
                  "leDV": "In ut tempor tempori"
              },
              "vaph": {
                  "reVAPH": "Quisquam illum sunt",
                  "leVAPH": "Ea cupiditate labore"
              },
              "nearVision": {
                  "reNearVision": "Inventore et alias a",
                  "leNearVision": "Eius provident non "
              },
              "vaSpect": {
                  "reVASpect": "Non ipsa culpa eum",
                  "leVASpect": "Rerum elit soluta c"
              },
              "colorVision": {
                  "reColorVision": "Ad rerum aut fugiat ",
                  "leColorVision": "Velit et deserunt l"
              }
          }
      },
      {
          "title": "Auto Refraction 👁️",
          "data": {
              "distance": {
                  "reSph": "Error laborum Dolor",
                  "reCyl": "Voluptas occaecat co",
                  "reAxis": "Velit dignissimos ex",
                  "reVision": "Aspernatur sapiente ",
                  "leSph": "Cillum dolorum sit d",
                  "leCyl": "Incidunt exercitati",
                  "leAxis": "Autem laborum ex do ",
                  "leVision": "Dolore soluta quia v"
              },
              "near": {
                  "reSph": "Consequatur iste si",
                  "reCyl": "Hic error culpa eum ",
                  "reAxis": "Fugit neque volupta",
                  "reVision": "Necessitatibus esse",
                  "leSph": "Voluptatem duis qui ",
                  "leCyl": "Voluptas quo minus n",
                  "leAxis": "Omnis est autem omni",
                  "leVision": "Sapiente tempora qui"
              },
              "add": {
                  "be": "Ducimus et dolorem ",
                  "re": "Hic sapiente amet o",
                  "le": "Quis odio reprehende"
              },
              "glassDetails": {
                  "type": "Consequat Accusamus",
                  "color": "Irure esse necessita",
                  "use": "Vel dolor cumque dol",
                  "pd": "Quia eaque voluptate"
              }
          }
      },
      {
          "title": "Cyclo Auto Refraction 👁️",
          "data": {
              "distance": {
                  "reSph": "Numquam qui pariatur",
                  "reCyl": "Ipsum dolor delenit",
                  "reAxis": "Magna cupiditate qua",
                  "reVision": "Fugiat mollitia tot",
                  "leSph": "Distinctio Voluptat",
                  "leCyl": "Sed qui voluptatem ",
                  "leAxis": "Et dolore eligendi u",
                  "leVision": "Deserunt quidem ut e"
              },
              "near": {
                  "reSph": "Est occaecat ipsa ",
                  "reCyl": "Nisi quia laborum co",
                  "reAxis": "Quidem quia in conse",
                  "reVision": "Vel iure similique v",
                  "leSph": "Quaerat sint volupta",
                  "leCyl": "Porro ex ullam magna",
                  "leAxis": "Enim iure quis quisq",
                  "leVision": "Praesentium dignissi"
              },
              "add": {
                  "be": "Ut consectetur illo",
                  "re": "Laborum Amet solut",
                  "le": "Est commodi tempore"
              },
              "glassDetails": {
                  "type": "Nam Nam deserunt mol",
                  "color": "Debitis quo quia off",
                  "use": "Esse accusamus prae",
                  "pd": "Delectus quibusdam "
              }
          }
      },
      {
          "title": "Today's Glass Prescription 👁️",
          "data": {
              "distance": {
                  "reSph": "Perferendis consequa",
                  "reCyl": "Facilis officia Nam ",
                  "reAxis": "Ab est mollit earum ",
                  "reVision": "Nisi quas sequi quo ",
                  "leSph": "Vitae magna qui cupi",
                  "leCyl": "Quis doloremque odio",
                  "leAxis": "Qui repellendus Ex ",
                  "leVision": "Ipsa qui qui dolor "
              },
              "near": {
                  "reSph": "Fugiat qui sed et vo",
                  "reCyl": "Enim a accusamus off",
                  "reAxis": "Ad consequuntur est ",
                  "reVision": "Sapiente velit quibu",
                  "leSph": "Aperiam omnis quam o",
                  "leCyl": "Dolore sed proident",
                  "leAxis": "Ut debitis veniam e",
                  "leVision": "Quis expedita sunt e"
              },
              "add": {
                  "be": "Praesentium officia ",
                  "re": "Doloribus voluptatem",
                  "le": "Et minus et nulla de"
              },
              "glassDetails": {
                  "type": "Architecto fugit ut",
                  "color": "Omnis dolores porro ",
                  "use": "Reprehenderit ducim",
                  "pd": "Quia earum ut sapien"
              }
          }
      }
  ],
  "followupDate": "2025-04-28",
  "followupDay": "Monday",
  "isAdmitted": true,
  "referDoctor": null,
  "prescriptionData": [
      {
          "type": "Syrup",
          "medicine": "Ipsum enim incidunt",
          "content": "Ducimus ea debitis ",
          "morning": "Beatae libero except",
          "afternoon": "Soluta eiusmod repre",
          "night": "Eum est asperiores ",
          "intakeTime": "Esse sint fugit asp",
          "days": 54,
          "quantity": 95,
          "filteredMedicines": [],
          "userModifiedQuantity": true
      },
      {
          "type": "Syrup",
          "medicine": "Sit incidunt cupidi",
          "content": "Cum voluptas sed par",
          "morning": "Exercitation pariatu",
          "afternoon": "Sit qui voluptatem",
          "night": "Optio occaecat dolo",
          "intakeTime": "Dolorem consectetur ",
          "days": 25,
          "quantity": 71,
          "filteredMedicines": [],
          "userModifiedQuantity": true
      },
      {
          "type": "Capsule",
          "medicine": "Voluptatibus perfere",
          "content": "Amet expedita nostr",
          "morning": "Sequi explicabo Inv",
          "afternoon": "Adipisicing voluptat",
          "night": "Similique elit ad q",
          "intakeTime": "Explicabo Molestiae",
          "days": 48,
          "quantity": 28,
          "filteredMedicines": [],
          "userModifiedQuantity": true
      },
      {
          "type": "Capsule",
          "medicine": "Impedit ipsum occa",
          "content": "Culpa sunt elit et",
          "morning": "Ea porro ut est non",
          "afternoon": "Esse architecto fug",
          "night": "Minima ut quo non in",
          "intakeTime": "Quo tempor dolor ali",
          "days": 70,
          "quantity": 21,
          "filteredMedicines": [],
          "userModifiedQuantity": true
      },
      {
          "type": "Tab",
          "medicine": "Lorem voluptates ea ",
          "content": "Est expedita consequ",
          "morning": "Veniam sit delenit",
          "afternoon": "Officia Nam dolor do",
          "night": "Accusamus rem duis d",
          "intakeTime": "Inventore aut aperia",
          "days": 22,
          "quantity": 51,
          "filteredMedicines": [],
          "userModifiedQuantity": true
      },
      {
          "type": "Syrup",
          "medicine": "Irure asperiores cul",
          "content": "Cupidatat voluptas e",
          "morning": "Et commodo magnam ap",
          "afternoon": "Quo eum quos veritat",
          "night": "Do numquam doloremqu",
          "intakeTime": "Quia ut consectetur ",
          "days": 65,
          "quantity": 79,
          "filteredMedicines": [],
          "userModifiedQuantity": true
      },
      {
          "type": "Tab",
          "medicine": "Omnis a enim autem r",
          "content": "Nihil debitis do ex ",
          "morning": "Sit iusto labore et ",
          "afternoon": "Hic quia quidem aliq",
          "night": "Excepteur maiores an",
          "intakeTime": "Quis asperiores dolo",
          "days": 95,
          "quantity": 12,
          "filteredMedicines": [],
          "userModifiedQuantity": true
      },
      {
          "type": "Tab",
          "medicine": "Sit quam molestiae e",
          "content": "Adipisci porro quaer",
          "morning": "Consequat Dolore mo",
          "afternoon": "Culpa commodi volup",
          "night": "Temporibus reprehend",
          "intakeTime": "Proident perspiciat",
          "days": 68,
          "quantity": 68,
          "filteredMedicines": [],
          "userModifiedQuantity": true
      },
      {
          "type": "Tab",
          "medicine": "Maiores quia iusto d",
          "content": "Dolorem in voluptate",
          "morning": "Voluptate doloremque",
          "afternoon": "Ad et odit deleniti ",
          "night": "Velit cupiditate id ",
          "intakeTime": "Suscipit nihil nemo ",
          "days": 40,
          "quantity": 71,
          "filteredMedicines": [],
          "userModifiedQuantity": true
      }
  ],
  "selectedCheckboxes": [
      {
          "opthal_examination": [
              {
                  "id": "9bdac336-dc74-4122-86fd-7d2420526969",
                  "name": "Op"
              },
              {
                  "id": "b76a7425-f852-4519-9b4a-4572d54ef809",
                  "name": "th"
              }
          ],
          "isPrintable": true
      }
  ],
  "aScan": {
      "entries": [
          {
              "title": "Dolore necessitatibu",
              "re": "Ipsam laborum Duis ",
              "le": "Animi ut illum nih",
              "saved": false
          },
          {
              "title": "Error blanditiis dol",
              "re": "Eos sunt voluptas a",
              "le": "Modi aut voluptatem",
              "saved": false
          },
          {
              "title": "Et occaecat anim lab",
              "re": "Esse eius quibusdam",
              "le": "Sed Nam molestias vo",
              "saved": false
          },
          {
              "title": "Repudiandae ea cupid",
              "re": "Sapiente quos repreh",
              "le": "Odio reprehenderit ",
              "saved": false
          },
          {
              "title": "Non omnis est adipi",
              "re": "Occaecat sint aut cu",
              "le": "Alias commodi tempor",
              "saved": false
          }
      ]
  },
  "wnl": {
      "entries": [
          {
              "title": "In ut consequat Vel",
              "re": "Velit ullam placeat",
              "le": "Esse repudiandae et ",
              "saved": false,
              "showGraph": false
          },
          {
              "title": "Aut et non aliquam l",
              "re": "Dolore excepteur nul",
              "le": "Accusamus adipisci N",
              "saved": false,
              "showGraph": false
          },
          {
              "title": "Assumenda nostrud al",
              "re": "Esse quaerat sint co",
              "le": "Non neque unde quam ",
              "saved": false,
              "showGraph": false
          },
          {
              "title": "Dolore eos architect",
              "re": "Quis cum dolorem exe",
              "le": "Aperiam mollit beata",
              "saved": false,
              "showGraph": false
          },
          {
              "title": "Mollitia aut quam om",
              "re": "Illo et porro archit",
              "le": "Neque ipsum lorem a ",
              "saved": false,
              "showGraph": false
          },
          {
              "title": "Nulla aliqua Autem ",
              "re": "Harum accusamus est",
              "le": "Eius dolorum et arch",
              "saved": false,
              "showGraph": false
          },
          {
              "title": "bdhjkvd",
              "re": "Voluptatem ullam fug",
              "le": "Libero sed quod volu",
              "saved": false,
              "showGraph": false
          }
      ]
  },
  "surgery": {
      "surgeryAdvice": "Dolore quia magnam p",
      "surgeryPlanDate": "1972-07-22",
      "surgeryStatus": "Ut explicabo Fugiat",
      "rightEyeAdmission": "2012-09-10",
      "leftEyeAdmission": "1984-08-10",
      "rightEyeSurgery": "2020-12-02",
      "leftEyeSurgery": "1986-09-21",
      "rightEyeDischarge": "2010-07-23",
      "leftEyeDischarge": "1975-05-19",
      "rightEyeLens": "Minim esse enim lab",
      "leftEyeLens": "Illum consectetur ",
      "rightEyePower": "Porro soluta et aute",
      "leftEyePower": "Mollit tenetur culpa",
      "rightEyeBatch": "Architecto inventore",
      "leftEyeBatch": "Optio consequat Un",
      "otherItem": "In magni similique n",
      "finalDiagnosis": "Exercitation aperiam",
      "conditionOnDischarge": "Deserunt fugiat cup",
      "adviceRemarkPlan": "Voluptatem illum so"
  }
}
constructor(private printService:PrintService){}
// print(){
//   window.print();
// }

print() {
  this.printService.printElement('print-section');
}

}
