import React from "react";
import ReactTable from "react-table-v6";
import moment from "moment";
import "react-table-v6/react-table.css";
import "./App.css";

require("./Globals");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      data: [],
      message: "Enter username or organisation above"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const url = "https://api.github.com/users/" + this.state.name + "/repos";

    fetch(url)
      .then(response => response.json())
      .then(res => {
        if (res.length > 0) {
          this.setState({ isLoading: false, data: res, name: "" });
        } else {
          this.setState({
            message: "Try another username or organisation",
            data: res,
            isLoading: false,
            name: ""
          });
        }

        return;
      })
      .catch(error => {
        this.setState({ isLoading: false, message: JSON.stringify(error) });
      });
  };

  render() {
    const columns = [
      {
        Header: (
          <div
            style={{
              backgroundColor: global.green,
              color: "white",
              padding: 10,
              fontWeight: "bold"
            }}
          >
            Name
          </div>
        ),
        accessor: "name",
        Cell: props => {
          return (
            <div style={{ padding: 5 }}>
              <a
                href={props.original.html_url}
                style={{
                  textDecoration: "none",
                  backgroundColor: "white",
                  border: "none",
                  textAlign: "left",
                  color: "grey"
                }}
              >
                <span> {props.value}</span>
              </a>
            </div>
          );
        }
      },

      {
        Header: (
          <div
            style={{
              backgroundColor: global.green,
              color: "white",
              padding: 10,
              fontWeight: "bold"
            }}
          >
            Description
          </div>
        ),
        accessor: "description",
        width: 400,
        filterMethod: (filter, row) => {
          const k =
            row.description &&
            row.description.toLowerCase().indexOf(filter.value.toLowerCase()) >=
              0;

          return k;
        },
        Cell: props => {
          return (
            <div style={{ padding: 5 }}>
              <a
                href={props.original.html_url}
                style={{
                  textDecoration: "none",
                  backgroundColor: "white",
                  border: "none",
                  textAlign: "left",
                  color: "grey"
                }}
              >
                <span> {props.value}</span>
              </a>
            </div>
          );
        }
      },
      {
        Header: (
          <div
            style={{
              backgroundColor: global.green,
              color: "white",
              padding: 10,
              fontWeight: "bold"
            }}
          >
            Date Created
          </div>
        ),

        accessor: "created_at",
        Cell: props => (
          <div style={{ textAlign: "right" }} className="number">
            {moment(props.value).format("Do MMM YYYY")}
          </div>
        )
      },

      {
        Header: (
          <div
            style={{
              backgroundColor: global.green,
              color: "white",
              padding: 10,
              fontWeight: "bold"
            }}
          >
            Language
          </div>
        ),
        accessor: "language",
        Cell: props => <div className="number">{props.value}</div> // Custom cell components!
      },
      {
        Header: (
          <div
            style={{
              backgroundColor: global.green,
              color: "white",
              padding: 10,
              fontWeight: "bold"
            }}
          >
            Size
          </div>
        ),
        accessor: "size",
        Cell: props => (
          <div style={{ textAlign: "right" }} className="number">
            {props.value}
          </div>
        ) // Custom cell components!
      },

      {
        Header: (
          <div
            style={{
              backgroundColor: global.green,
              color: "white",
              padding: 10,
              fontWeight: "bold"
            }}
          >
            Watchers
          </div>
        ),
        accessor: "watchers_count",
        Cell: props => (
          <div style={{ textAlign: "right" }} className="number">
            {props.value}
          </div>
        ) // Custom cell components!
      },

      {
        Header: (
          <div
            style={{
              backgroundColor: global.green,
              color: "white",
              padding: 10,
              fontWeight: "bold"
            }}
          >
            Stargazers
          </div>
        ),
        accessor: "stargazers_count",
        Cell: props => (
          <div style={{ textAlign: "right" }} className="number">
            {props.value}
          </div>
        ) // Custom cell components!
      }
    ];

    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <form
          style={{
            margin: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onSubmit={this.handleSubmit}
        >
          <input
            style={{
              fontSize: 16,
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: 15,
              margin: 10,
              width: 380
            }}
            placeholder={"Enter Github username or organisation"}
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            disabled={!(this.state.name.length > 0)}
            style={{
              fontSize: 16,
              color: "white",
              backgroundColor:
                this.state.name.length > 0 ? global.blue : "lightgrey",
              border: "none",
              borderRadius: 5,
              padding: 15,
              margin: 10,
              width: 80
            }}
            type="submit"
            value="Search"
          />
        </form>
        <ReactTable
          style={{
            backgroundColor: "white",
            color: "gray",
            marginLeft: 50,
            marginRight: 50
          }}
          noDataText={this.state.message}
          filterable
          data={this.state.data}
          columns={columns}
        />
      </div>
    );
  }
}

export default App;
