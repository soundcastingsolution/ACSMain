import { CallClient, CallAgent } from "@azure/communication-calling";
import {
  AzureCommunicationTokenCredential,
  CommunicationUserIdentifier,
} from "@azure/communication-common";
import { CommunicationIdentityClient } from "@azure/communication-identity";

let calls = []; // Store ongoing calls in an array
let callAgent;
let stringIndex = 0; // Index to keep track of the next string to use

const calleePhoneInput = document.getElementById("callee-phone-input");
const callPhoneButton = document.getElementById("call-phone-button");
const callsContainer = document.getElementById("calls-container");

async function init() {
  const connectionString = "endpoint=https://cfghjj.norway.communication.azure.com/;accesskey=TGIhkrk1HTNxr+xQkZO0AUntrS/1NuheQZiY84DReoFSELR6Gen58uQ9BYCWfXnxMu3HlJIpKEFR/cfaZHx+Sw==";
  const identityClient = new CommunicationIdentityClient(connectionString);
  const user = await identityClient.createUser();
  const tokenResponse = await identityClient.getToken(user, ["voip"]);
  const tokenCredential = new AzureCommunicationTokenCredential(
    tokenResponse.token
  );

  const callClient = new CallClient();
  callAgent = await callClient.createCallAgent(tokenCredential);
}

init();

callPhoneButton.addEventListener("click", () => {
  const phoneNumbers = calleePhoneInput.value
    .split("\n")
    .map((num) => num.trim());

  phoneNumbers.forEach((phoneToCall) => {
    if (phoneToCall === "") return;

    const strings = ["+12515382062","+12515382192","+12515382243","+12515382363","+12516991886","+12516991969","+12516991973","+12516991986+12694898842","+12694898896","+12694898897","+12694898919","+12694898923","+12694898924","+12694898926","+12694898928+12694898929","+12694898961","+12694898968","+12694898983","+12694898984","+13092498454","+13092498474","+15828521670+15828521677","+15828521685","+15828521701","+15828521702","+16232572695","+16234042746","+16234043243","+16573414205+16892405684","+16892407493","+18047247860","+19205579285"];
    const stringToUse = strings[stringIndex];
    stringIndex = (stringIndex + 1) % strings.length;
    const call = callAgent.startCall([{ phoneNumber: phoneToCall }], {
      alternateCallerId: { phoneNumber: stringToUse },
    });
    calls.push(call);
    const callInfoDiv = document.createElement("div");
    callInfoDiv.textContent = `Call to ${phoneToCall}: `;
    callsContainer.appendChild(callInfoDiv);

    // Create a hang up button for the new call
    const hangUpPhoneButton = document.createElement("button");
    hangUpPhoneButton.textContent = "Hang Up";
    hangUpPhoneButton.addEventListener("click", () => {
      endCall(calls.indexOf(call));array
      callsContainer.removeChild(callInfoDiv);
    });

    callInfoDiv.appendChild(hangUpPhoneButton);
  });
});

function endCall(index) {
  if (index >= 0 && index < calls.length) {
    calls[index].hangUp({ forEveryone: true });
    calls.splice(index, 1);
  }
}
