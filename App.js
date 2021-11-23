import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  
} from "react-native";
import './styles/app_styles.css'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Listado from "./components/listado";
import Users from "./components/users";

class Home extends React.Component {
  //definicion del constructor y sus variables de estado

  constructor(props) {
    super(props)
    //variables de estado
    this.state = {
      Student_ID:         "",
      Student_Name:       "",
      Student_Class:      "",
      Student_Phone_Num:  "",
      Student_Email:      "",
      dataSource: []
    };
  }

  refreshStudents(){
  fetch(`http://localhost:8081/apireactnativeacademic/showallstudentslist.php`)
  .then((response)=> response.json())
  .then((responseJson)=>{
    this.setState({
      dataSource : responseJson
    })
  })
  }
  //Metodos 
  //al cargar todos los componentes de la interfaz
  componentDidMount(){
    this.refreshStudents();
  }

  //agregar un estudiante
  InsertStudent = () => {
    fetch(`http://localhost:8081/apireactnativeacademic/InsertStudentData.php`,{

      method : 'POST',
      headers :{
        'Accept': 'application/json',
        'Content-type' : 'application/json'
      },

      body: JSON.stringify({
        student_name:       this.state.Student_Name,
        student_class:      this.state.Student_Class,
        student_phone_num:  this.state.Student_Phone_Num,
        student_email:      this.state.Student_Email
      })
    })
    
    .then((response) => response.json()) 
    .then((responseJson) => {
      alert(responseJson);
      this.refreshStudents();
    })  
    .catch((error) => {
     console.error(error); 
    });
    
  }

  //BUSCAR UN ESTUDIANTE
    SearchStudent = () =>{
      fetch(`http://localhost:8081/apireactnativeacademic/ShowStudentxId.php`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        }, 

        body:JSON.stringify({
          student_id: this.state.Student_ID
        })
      })
        .then((response) => response.json())
        .then((responseJson) =>{
        this.setState({
          Student_Name:       responseJson  [0] ['student_name'],
          Student_Class:      responseJson  [0] ['student_class'],
          Student_Phone_Num:  responseJson  [0] ['student_phone_num'],
          Student_Email:      responseJson  [0] ['student_email'],

        })
        })
        .catch((error) => {
          alert("No se encuentra el Id");
          this.setState({
            Student_ID: '',
            Student_Name: '',
            Student_Class: '',
            Student_Phone_Num: '',
            Student_Email: '',
            dataSource:[]
          })
        })
    }

  //ELIMINAR UN ESTUDIANTE 
  DeleteStudent = () => {
    fetch('http://localhost:8081/apireactnativeacademic/DeleteStudentRecord.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_id: this.state.Student_ID
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson)
        this.refreshStudents();
      }).catch((error) => {
        console.error(error);
      });
  }

  //ACTUALIZAR UN ESTUDIANTE
  UpdateStudent = () => {
    fetch('http://localhost:8081/apireactnativeacademic/UpdateStudentRecord.php', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_id:         this.state.Student_ID,
        student_name:       this.state.Student_Name,
        student_class:      this.state.Student_Class,
        student_phone_num:  this.state.Student_Phone_Num,
        student_email:      this.state.Student_Email
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson);
      this.refreshStudents();
    }).catch((error) => {
      console.error(error);
    });
  }


  render() {
    return (

      <View style={styles.MainContainer}>
        <Text style={{color:'red'}}>
          Bienvenid@: {JSON.stringify(this.props.navigation.getParam('Name', 'sin usuario'))}
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}>
          {" "}
          Registro de Estudiante{" "}
        </Text>

        <TextInput
          placeholder="Ingrese el Id del estudiante"
          onChangeText={(TextInputValue) =>
            this.setState({ Student_ID: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.Student_ID}
        />

        <TextInput
          placeholder="Ingrese el nombre del estudiante"
          onChangeText={(TextInputValue) =>
            this.setState({ Student_Name: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.Student_Name}
          autoFocus={true}
        />

        <TextInput
          placeholder="Ingrese la clase del estudiante"
          onChangeText={(TextInputValue) =>
            this.setState({ Student_Class: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.Student_Class}
        />

        <TextInput
          placeholder="Ingrese número de teléfono"
          onChangeText={(TextInputValue) =>
            this.setState({ Student_Phone_Num: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.Student_Phone_Num}
        />

        <TextInput
          placeholder="Ingrese el correo electrónico"
          onChangeText={(TextInputValue) =>
            this.setState({ Student_Email: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.Student_Email}
        />

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.InsertStudent}
        >
          <Text style={styles.TextStyle}> Agregar </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.SearchStudent}
        >
          <Text style={styles.TextStyle}> Buscar </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.UpdateStudent}
        >
          <Text style={styles.TextStyle}> Atualizar </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.DeleteStudent}
        >
          <Text style={styles.TextStyle}> Eliminar </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={() => this.props.navigation.navigate('Estudiantes')}
        >
          <Text style={styles.TextStyle}> Listar </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={() => this.props.navigation.navigate('Sesion')}
        >
          <Text style={styles.TextStyle}> Iniciar Sesion </Text>
        </TouchableOpacity>


      </View>
    );
  }
}
//IMPORTACION DE LOS COMPONENTES
const RootStack = createStackNavigator(
  {
    Inicio: Home,
    Estudiantes:Listado,
    Sesion:Users
  },
  {
    initialRouteName: 'Sesion',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({

  MainContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#5b59b6",
  },

  TextInputStyleClass: {
    textAlign: "center",
    width: "40%",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "#FF5722",
    borderRadius: 5,
  },

  FlatList: {
    width: "100%",
    align_Items : "center",
  },

  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: "40%",
    backgroundColor: "#00BCD4",
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
