import Pusher, {Channel} from "pusher-js";


let pusher: Pusher
export let pusherChannel: Channel

export async function initPusher() {

    pusher = new Pusher('8942e22423ec13a74600', {
        cluster: 'eu',
        channelAuthorization: {
            endpoint: "/api/channels-event",
            transport: "ajax"
        }
    });
    console.log("push")
    pusherChannel = pusher.subscribe('private-student-channel');
    pusherChannel.bind("pusher:subscription_succeeded", ()=> console.log("hat gekopllt"))
    pusherChannel.bind("pusher:subscription_error", ()=> console.log("ging schief"))

}

export function subscribeToChannel(channelName: string) {
    if (!channelName.startsWith("private-")) {
        channelName = "private-"+ channelName
    }
    if (!pusher) {
        console.error("pusher not initialized")
        return
    }
    console.log(channelName)
    pusherChannel = pusher.subscribe(channelName)
}


// channel.bind('my-event', function(data: any) {
//     alert(JSON.stringify(data));
// });