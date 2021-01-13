addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

    let req_query = new URL(request.url).searchParams.get('q')


    if (req_query == null) {

        const reply = {
            "status": "failed",
            "message": "Send with an url query"
        };

        return new Response(JSON.stringify(reply), {
            headers: {
                "content-type": "application/json",
            },
        })

    } else {
        var id = req_query.split("/").pop()
    }

    var result = await fetch(`https://wapi.voot.com/ws/ott/getMediaInfo.json?platform=Web&pId=2&mediaId=${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    var result = await result.json()

    const error_msg = {
        "status": "failed",
        "message": "Invalid URL"
    }

    if (!result) {
        return new Response(JSON.stringify(error_msg), {
            status: 400,
            headers: ({
                "Content-Type": "application/json",
            })
        })
    } else {
        var pass = ({
            title: result.assets.MediaName,
            description: result.assets.Metas[1].Value,
            thumnail: result.assets.Pictures[0].URL.replace("https://viacom18-res.cloudinary.com/image/upload/f_auto,q_auto:eco,fl_lossy/kimg", "https://kimg.voot.com"),
            video: result.assets.Files[3].URL
        })
        res_data = {
            "title": pass.title,
            "description": pass.description,
            "thumnail": pass.thumnail,
            "Video_URL": pass.video
        }
        return new Response(await JSON.stringify(res_data), {
            status: 200,
            headers: ({
                "Content-Type": "application/json",
            })
        })
    }
}
