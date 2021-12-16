import firebase from 'firebase'

const getBlob = async (uri) => {
    return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => { console.log('loaded blob'); resolve(xhr.response) }
        xhr.onerror = e => { console.log(e); reject(new TypeError("Network request failed")) }
        xhr.responseType = 'blob'
        xhr.open('GET', uri, true)
        xhr.send(null)
    })
}

const ImageUploader = {
    async upload(uri, bottleId) {
        let blob
        try {
            blob = await getBlob(uri)
        } catch {
            return null
        }

        let result
        try {
            result = await firebase.storage().ref().child('user').child(firebase.auth().currentUser.uid).child(bottleId).put(blob)
        } catch {
            return null
        }
        console.log(result.metadata)
        return `storage://${result.metadata.fullPath}`
    }
}

export default ImageUploader