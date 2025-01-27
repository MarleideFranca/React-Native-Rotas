import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Input, Avatar, ListItem, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGu-FmfDA4WFsOJ1NZ0aO2jLtbUVLReL8",
  authDomain: "meuapp-86462.firebaseapp.com",
  projectId: "meuapp-86462",
  storageBucket: "meuapp-86462.appspot.com",
  messagingSenderId: "914474655871",
  appId: "1:914474655871:web:cbe435179a67e60d86df4a",
  measurementId: "G-GQ5HBQM0BP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

async function adicionarContato(nome, email, telefone, { navigation }) {
  var res = axios.post("http://professornilson.com/testeservico/clientes", {
    nome: nome,
    email: email,
    telefone: telefone
  })
    .then((response) => {
      console.log("Deu certo!");
      navigation.goBack();
    })
    .catch((Erro) => {
      console.log(Erro);
    })
}

// Alterar contato usando o axios
async function alterarContato(nome, email, telefone, { navigation }) {
  var res = axios.put("http://professornilson.com/testeservico/clientes", {
    nome: nome,
    email: email,
    telefone: telefone
  })
    .then((response) => {
      console.log("Deu certo!");
      navigation.goBack();
    })
    .catch((Erro) => {
      console.log(Erro);
    })
}

// Excluir contato usando o axios
async function excluirContato(nome, email, telefone, { navigation }) {
  var res = axios.delete("http://professornilson.com/testeservico/clientes", {
    nome: nome,
    email: email,
    telefone: telefone
  })
    .then((response) => {
      console.log("Deu certo!");
      navigation.goBack();
    })
    .catch((Erro) => {
      console.log(Erro);
    })
}

function HomeScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Avatar
          size={'large'}
          rounded
          source={{
            uri:
              'https://cdn2.iconfinder.com/data/icons/circle-avatars-1/128/050_girl_avatar_profile_woman_suit_student_officer-512.png',
          }}
        />
      </View>

      <Input
        label='Login'
        value={login}
        onChangeText={login => setLogin(login)}
      />
      <Input
        label='Senha'
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
      />
      <Button
        buttonStyle={{ width: 365 }}
        title="Login"
        onPress={() => {
          signInWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
              navigation.navigate('listScreen');
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
            });
        }}
      />
      <Button
        buttonStyle={{ width: 365, backgroundColor: 'red', marginTop: 15 }}
        title="Cadastrar-se"
        onPress={() => navigation.navigate('cadastrarScreen')}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      </View>
    </View>

  );
}
function CadastrarScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View>
      <Header
        centerComponent={{ text: 'Usuário', style: { color: '#fff', fontSize: 20 } }}
        leftComponent={<Icon onPress={() => navigation.navigate('Home')} name="arrow-left" size={24} color="#ffffff"></Icon>}

      />

      <Input
        label='nome'
      />
      <Input
        label='cpf'
      />
      <Input
        label='email'
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <Input
        label='Senha'
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
      />
      <Button
        buttonStyle={{ width: 365, alignSelf: 'center' }}
        title="Salvar"
        onPress={() => {

          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              //const user = userCredential.user;
              // ...
              navigation.goBack();
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log('erro', errorMessage);
              // ..
            });
        }}
      />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      </View>
    </View>

  );
}

function adicionarContatoScreen({ navigation }) {

  const [adicionarContatos, setadicionarContatos] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');


  return (
    <View>
      <Header
        centerComponent={{ text: 'Contato', style: { color: '#fff', fontSize: 20 } }}
        leftComponent={<Icon onPress={() => navigation.navigate('listScreen')} name="arrow-left" size={24} color="#ffffff"></Icon>}

      />

      <Input
        label='nome'
        onChangeText={nome => setNome(nome)}
      />
      <Input
        label='email'
        onChangeText={email => setEmail(email)}
      />
      <Input
        label='Telefone'
        onChangeText={telefone => setTelefone(telefone)}

      />
      <Button
        buttonStyle={{ width: 365, alignSelf: 'center' }}
        title="Salvar"
        onPress={() => adicionarContato(nome, email, telefone, { navigation })}
      />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      </View>
    </View>

  );
}

function alterarContatoScreen({ navigation }) {
  return (
    <View>
      <Header
        centerComponent={{ text: 'Contato', style: { color: '#fff', fontSize: 20 } }}
        leftComponent={<Icon onPress={() => navigation.navigate('listScreen')} name="arrow-left" size={24} color="#ffffff"></Icon>}

      />

      <Input
        label='nome'
      />
      <Input
        label='email'
      />
      <Input
        label='Telefone'

      />
      <Button
        buttonStyle={{ width: 365, alignSelf: 'center' }}
        title="Alterar"
      />
      <Button
        buttonStyle={{ width: 365, backgroundColor: 'red', marginTop: 15, alignSelf: 'center' }}
        title="Excluir"

      />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      </View>
    </View>

  );
}


function listScreen({ navigation }) {
     const list = [
      {
        name: 'Gilson Romão',
        avatar_url: 'https://pps.whatsapp.net/v/t61.24694-24/247821742_517308889897862_952747548644422010_n.jpg?ccb=11-4&oh=01_AVyza-qXSmJaxp6tpmIUp1hX8p8PjC_PCeUZnksLnESeKQ&oe=63556EF0',
        subtitle: ' 81 988411487'
      },
      {
        name: 'Felipe Rocha',
        avatar_url: 'https://avatars.githubusercontent.com/u/14117712?v=4',
        subtitle: '81 988416113'
      },
      {
        name: 'Marineide França',
        avatar_url: 'https://pps.whatsapp.net/v/t61.24694-24/301363286_527093989422041_5733080581339174176_n.jpg?ccb=11-4&oh=01_AVxL5dJ8btB_jYPaKCl_HZJu2i1pTbS0bON9iFuZ5pblZQ&oe=6352286E',
        subtitle: '81 987686855'
      },
  
      {
        name: 'Ana Maria',
        avatar_url: 'https://pps.whatsapp.net/v/t61.24694-24/169238802_656959332197220_793667967797382750_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AVwW6I0Q3zniaGydZQQAxm1HKVPZBWC1z5FxNDon35Pc2g&oe=6355C32C',
        subtitle: '81 987686805'
      }];
    
  const [listaUsuarios, setlistaUsuarios] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {

    async function getUsuarios() {

      const res = await axios.get('http://professornilson.com/testeservico/clientes')
        .then(function (response) {
          setlistaUsuarios(response.data);
        })
        .catch(function (erro) {
          console.log(erro);
        })
    }
    getUsuarios();
  }, [isFocused])

  return (

    <View>
      <Header
        centerComponent={{ text: 'Lista de Contatos', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={<Icon name="sign-out" size={24} color="#ffffff" onPress={() => {
          signOut(auth).then(() => {
            navigation.navigate('Home');
          }).catch((error) => {
            console.log(error.message);
          });
        }}></Icon>}
        leftComponent={<Icon name="plus" size={24} color="#ffffff" onPress={() => navigation.navigate('adicionarContatoScreen')}></Icon>}
      />


      <View>
        <ScrollView>
          {
            listaUsuarios.map((l, i) => (
              <ListItem key={i} bottomDivider onPress={() => navigation.navigate('alterarContatoScreen')}>
                <Avatar source={{ uri: 'https://cdn2.iconfinder.com/data/icons/circle-avatars-1/128/050_girl_avatar_profile_woman_suit_student_officer-512.png' }} />
                <ListItem.Content>
                  <ListItem.Title>{l.nome}</ListItem.Title>
                  <ListItem.Subtitle>{l.telefone}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="listScreen" component={listScreen} />
        <Stack.Screen name="cadastrarScreen" component={CadastrarScreen} />
        <Stack.Screen name="adicionarContatoScreen" component={adicionarContatoScreen} />
        <Stack.Screen name="alterarContatoScreen" component={alterarContatoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;