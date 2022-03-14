import React from 'react'
import { Link } from 'react-router-dom';

//import './Button.scss'  imported in app becose of the next.js limitations

const Button = props => {

    const buttonColor = props.color ? `button--${props.color}` : "";

    const scrollToElement = element => {
        window.scrollTo(
            {top: parseInt(element.current.getBoundingClientRect().top),
             left: 0,
             behavior: 'smooth'
            })
    }

    if (props.href) {
        return (
            <a
                className={`button ${props.reverse && 'button--reverse'} ${buttonColor}`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }

    if (props.scrollTo) {
        return (
            <button
                className={`button ${props.reverse && 'button--reverse'} ${buttonColor}`}
                href={props.href}
                onClick={ () => { scrollToElement(props.scrollTo) }}
            >
                {props.children}
            </button>
        );
    }

    if (props.to){
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`button ${props.reverse && 'button--reverse'} ${buttonColor}`}
            >
                {props.children}
            </Link>
        );
    }

    return (
        <button
            className={`button ${props.reverse && 'button--reverse'} ${buttonColor}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}

export default Button