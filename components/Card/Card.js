import React from 'react';
import { Component } from 'react';
import './Card.scss'

export default class Card extends Component {
  render () {
    return (
      <figure className="card">
        <img className="card-img" src={this.props.source} alt={this.props.title}/>
        <figcaption className="card-caption">
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
        </figcaption>
      </figure>
    )
  }
}
