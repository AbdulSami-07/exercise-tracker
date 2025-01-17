import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Exercise = props => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.exercise._id}>edit</Link> | <Link path="#" onClick={ () => { props.deleteExercise(props.exercise._id) }}>delete</Link>
            </td>
        </tr>
    );
}

export default class ExercisesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            exercises : []
        };

        this.deleteExercise = this.deleteExercise.bind(this);

    }

    componentDidMount(){ //It is called when react is done rendering to DOM.
        axios.get('http://localhost:8080/exercises')
        .then(res => {
            this.setState({
                exercises : res.data
            });
        })
        .catch(err => console.log("Error: in axios exercises list" + err));
    }

    deleteExercise(id){
        axios.delete('http://localhost:8080/exercises/' + id)
        .then(res => console.log(res.data));

        this.setState(state => ({
               exercises : state.exercises.filter(el => el._id !== id)  
        }));
    }

    exerciseList() {
        return this.state.exercises.map(currExercise => {
            return <Exercise exercise={currExercise} deleteExercise={this.deleteExercise} key={currExercise._id} />
        });
    }


    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        );
    }
}