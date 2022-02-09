import React from 'react';

import styles from './FormContainer';

const FormContainer = ({ children }) => {

    return(
        <section className={styles.formContainer}>
            <header>
                <h3></h3>
                <small></small>
            </header>
            <div>
            { children }
            </div>
        </section>
    );
}

export default FormContainer;