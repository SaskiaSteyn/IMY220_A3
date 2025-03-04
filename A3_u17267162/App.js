class App extends React.Component{
  events = [
    {
      name: "A Walk in the Park",
      date: "2021-09-19",
      description: "Let's go walking and feed the ducks. #ducks #walk #park #Sunday",
    },
    {
      name: "Beach Day!",
      date: "2019-12-28",
      description: "Let's have a fun day on the beach right before #xmas !! #beachday #summertime"
    },
    {
      name: "Pokemon Go Meetup",
      date: "2016-06-11",
      description: "I wanna meet up with #PokemonGo fans to #catchEmAll #pokemon #meetup"
    },
    {
      name: "Crochet Date!",
      date: "2024-07-09",
      description: "Let's meetup to go crochet in the park. I'll bring the wool!! #park #crochet #meetup"
    },
    {
      name: "Yoga in the Morning",
      date: "2022-07-15",
      description: "Join us for a refreshing morning #yoga session #wellness #morning"
    },
    {
      name: "Hackathon",
      date: "2023-03-10",
      description: "Compete in this year's #hackathon to win amazing prizes and meet feelow #coders #coding"
    },
    {
      name: "Summer Braai",
      date: "2021-08-05",
      description: "Come and enjoy a delicious braai with friends and family #braai #summertime #summer #fun"
    },
    {
      name: "Art Exhibition",
      date: "2018-05-20",
      description: "Explore modern art at the Joburg #art #exhibition from talented artists around the world #creativity"
    },
    {
      name: "Star Wars Under the Stars",
      date: "2023-05-04",
      description: "Watch your favorite #StarWars movies under the open sky! #movienight #outdoor #maythe4thbewithyou"
    },
    {
      name: "Live Concert: Rock the Night",
      date: "2023-06-25",
      description: "Enjoy an electrifying night of live music from your favourite #rock artists #concert #rockmusic #livemusic"
    },
    {
      name: "Farmers Market",
      date: "2024-04-01",
      description: "Fresh produce, homemade goods, and more at the local farmers market this week #farmersmarket #organic"
    },
    {
      name: "Comicon Anyone?",
      date: "2024-09-26",
      description: "Who's going to #comicon this year? Let's #meetup - I'll be Spiderman!"
    }
  ];

  constructor(props){
    super(props);
    this.state = { feed: this.events};
    this.searchFeed = this.searchFeed.bind(this);
  }

  searchFeed(event){
    event.preventDefault();

    var result = event.target[0].value;

      if(result === ""){
        this.setState((prevState) => ({ feed: this.events}));
      }
      else if(result.startsWith("#")){
        var filteredEvents = this.events.filter((event) => event.description.includes(result));
        this.setState((prevState) => ({feed: filteredEvents}));
      }
      else{
        var filteredEvents = this.events.filter((event) => event.name.includes(result));
        this.setState((prevState) => ({feed: filteredEvents}));
      }
  }

  render(){
    return(
      <div>
        <Search handleSearch = {this.searchFeed}/>
        <h2>Feed</h2>
        <EventFeed events={this.state.feed}/>
      </div>
    );
  }
    
}


class Event extends React.Component{
constructor(props){
super(props);
}
render(){
return(
  <div>
    <h2>{this.props.name}</h2>
    <p>{this.props.date}</p>
    <p>{this.props.description}</p>
</div>
);
}
}

class EventFeed extends React.Component{
constructor(props){
super(props);
}
render() {
return (
<div>
  {this.props.events.sort((a, b) => {
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();

    return dateA - dateB;
  })
  .reverse().map((event, index) =>{
      return(
        <Event
          key={index}
          name = {event.name}
          date = {event.date}
          description = {event.description}
          />
      );
    })}
</div>
);
}

}

class Search extends React.Component{
constructor(props){
super(props);
this.search = this.search.bind(this);
}
search(event){
this.props.handleSearch(event);
}
render() {
return(
  <div>
    <h1>Events!</h1>
    <form onSubmit={this.search}>
      <label>Search</label>
      <input type="text" placeholder="Search something..."/>
      <button type="submit">search</button>
    </form>
  </div>
);
}
}

function handleSearch(event){
event.preventDefault();
}


const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<EventFeed events={events} />);
// root.render(<Search handleSearch = {handleSearch}/>);
root.render(<App />);