import React from 'react';
import { Image, ImageBackground, StyleSheet,View,Text, TouchableOpacity } from 'react-native';

function WelcomeScreen({navigation}) {
    return (
       
        
        <ImageBackground style= {styles.background} source={require('../assets/images/BG14.jpg')} >
        <Image source={require('../assets/images/BG9.jpg')} style={styles.coverimage}></Image> 
           <View style={styles.subcontainer}>
            <Text style={styles.wmtext}>Welcome!</Text>
            <Text style={styles.mptext}>Your go to marketplace for zari and mushroom</Text>
           </View>
            <TouchableOpacity style={styles.gsbutton} onPress={() => navigation.navigate('SignUp')}><Text style={styles.gstext}>Get Started!</Text></TouchableOpacity>
        </ImageBackground>
        
        
    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        //justifyContent:'flex-end'
    },
        

    gsbutton:{
        backgroundColor:'#d4ac0d',
        padding:20,
        borderRadius:99,
        width:'70%',
        position: 'absolute',
        bottom: '12%',
        left:'15%'
    },
    gstext:{
        textAlign:'center',
        //fontfamily:'inline'
    },
    coverimage:{
       height:'80%',
       width:'140%',
       resizeMode:'cover',
       borderRadius:150,
       bottom:100
    },
    wmtext:{
        fontSize:60,
        fontFamily:'',
        color:'#fbfcfc',
    },
    mptext:{
        fontSize:21,
        fontFamily:'',
        color:'#fbfcfc',
        //alignSelf:'center'

    },
    subcontainer:{
        bottom:150,
       
    }
    
    
    
})

export default WelcomeScreen;