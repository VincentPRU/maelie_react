import React from 'react';

import styles from './FormContainer.module.scss';

const FormContainer = ({ title, subTitle, children }) => {

    return(
        <section className={styles.formContainer}>
            <header>
                <h3>{title}</h3>
                <small>{subTitle}</small>
            </header>
            <div>
                
            { children }
            </div>
        </section>
    );
}

export default FormContainer;