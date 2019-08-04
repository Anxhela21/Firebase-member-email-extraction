function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}React.createElement("script", { src: "https://www.gstatic.com/firebasejs/5.8.2/firebase.js" });

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAisuqf27BcD7sP7wWIGgtEK8nzuqgwuNA",
  authDomain: "fir-email-list.firebaseapp.com",
  databaseURL: "https://fir-email-list.firebaseio.com",
  projectId: "fir-email-list",
  storageBucket: "fir-email-list.appspot.com",
  messagingSenderId: "888622611812" };

firebase.initializeApp(config);



class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      currentItem: "",
      username: "",
      items: [] });}

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value });

  }
  handleSubmit(e) {

    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.currentItem,
      user: this.state.username };

    itemsRef.push(item);
    this.setState({
      currentItem: "",
      username: "" });

  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref("items");
    // we load an event listener
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user });

      }
      this.setState({
        items: newState });

    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username };

    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: '' });

  }





  render() {
    return (
      React.createElement("div", { className: "app" },
      React.createElement("header", null,
      React.createElement("div", { className: "wrapper" },
      React.createElement("h1", null, "Member email list"))),



      React.createElement("div", { className: "container" },
      React.createElement("section", { className: "add-item" },
      React.createElement("form", { onSubmit: e => this.handleSubmit(e) },
      React.createElement("input", { type: "text", name: "username",
        placeholder: "What's your name?",
        onChange: e => this.handleChange(e),
        value: this.state.username }),
      React.createElement("input", { type: "text", name: "currentItem", placeholder: "What is your email?", onChange: e => this.handleChange(e), value: this.state.currentItem }),
      React.createElement("button", null, "Add Member"))),


      React.createElement("section", { className: "display-item" },
      React.createElement("div", { className: "wrapper" },
      React.createElement("ul", null,
      this.state.items.map(item => {
        return (
          React.createElement("li", { key: item.id },
          React.createElement("h3", null, item.title),
          React.createElement("p", null, "Member: ", item.user,
          React.createElement("button", {
            onClick: () => this.removeItem(item.id) }, "Remove Item"))));



      })))))));






  }}


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));