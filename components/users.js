import React from 'react';
import { StyleSheet,Text, View, TextInput, TouchableOpacity } from 'react-native';
import App from '../App';

export default class Users extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      ID: '',
      Name: '',
      Email: '',
      Password: ''
    }

  }

  SearchUser =  () => {

    fetch(`http://localhost:8081/apireactnativeacademic/SearchUser.php`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        name: this.state.Name,
        password: this.state.Password
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          Name: responseJson        [0]['name'],
          Email: responseJson       [0]['email'],
          Password: responseJson    [0]['password']
        })
        this.props.navigation.navigate('Inicio', { 
            Name: this.state.Name
          })
        //alert(this.state.Name);
      }).catch((error) => {
        alert('No se encuentra el Usuario');
        this.setState({
          ID: '',
          Name: '',
          Email: '',
          Password: '',
        })
      });

  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Registro de Usuarios </Text>
        <TextInput
          placeholder="Nombre de Usuario"
          onChangeText={TextInputValue => this.setState({ Name: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Name}
          autoFocus={true}
          
        />
        <TextInput
          placeholder="Correo electrónico"
          onChangeText={TextInputValue => this.setState({ Email: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          value={this.state.Email}
        />
        <TextInput
          placeholder="Contraseña"
          onChangeText={TextInputValue => this.setState({ Password: TextInputValue })}
          underlineColorAndroid='transparent'
          secureTextEntry={true}
          style={styles.TextInputStyleClass}
          value={this.state.Password}
          
        />
        
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.SearchUser} >
          <Text style={styles.TextStyle}> Iniciar Sesión </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >
          <Text style={styles.TextStyle}> Registrar </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff'

  },

  TextInputStyleClass: {

    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 5,

  },

  TouchableOpacityStyle: {

    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '50%',
    backgroundColor: '#00BCD4'

  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});