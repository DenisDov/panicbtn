import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';

const APi_URL = 'https://httpbin.org/post';
const headers = {
  'Content-Type': 'multipart/form-data'
};

const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export default class App extends React.Component {
  state = {
    isFetching: false,
    data: {},
    error: null
  };

  makePanic = () => {
    const formData = new FormData();
    formData.append('message', 'HELP ME!');
    this.setState({ isFetching: true });

    fetch(APi_URL, {
      method: 'POST',
      headers,
      body: formData
    })
      .then(response => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .then(data => {
        this.setState({ isFetching: false, data });
        Alert.alert('OK', `${data.url}`, [{ text: 'OK' }], {
          cancelable: false
        });
      })
      .catch(error => this.setState({ isFetching: false, error }));
  };

  render() {
    const { isFetching, error } = this.state;
    console.log('this.state.data', this.state.data);
    if (isFetching) {
      return (
        <Container>
          <ActivityIndicator size="large" />
        </Container>
      );
    }
    if (error) {
      return (
        <Container>
          <Text>Something went wrong...</Text>
        </Container>
      );
    }
    return (
      <Container>
        <TouchableOpacity style={styles.panicButton} onPress={this.makePanic}>
          <Text>PANIC BUTTON</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  panicButton: {
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: 'tomato',
    borderWidth: 10,
    borderColor: 'dodgerblue',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

console.disableYellowBox = true;
