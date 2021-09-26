import React from 'react'
import { View, Image, StyleSheet, Button } from 'react-native'

import fire from '../fire'
require("firebase/firestore")
require("firebase/firebase-storage")

export default function Save(props) {

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `image/${fire.auth().currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log("blob passed")
        const task = fire
            .storage()
            .ref()
            .child(childPath)
            .put(blob)
        console.log("task passed");
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = snapshot => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                console.log(snapshot);
            })
        }

        const taskError = snapshot => {
            console.log(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }
    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly'}}>
            <Image source={{uri: props.route.params.image}} style={{ flex: 1, resizeMode: 'contain', flexDirection: 'row'}}/>
            <Button title="Save" onPress={uploadImage}/>
        </View>
    )
}
const styles = StyleSheet.create({
    cameraContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    fixedRatio: {
      flex: 1,
      aspectRatio: 2 / 3
    }
  })
