import styles from './Header.module.css'

export default function Header(props){
    return(
        <>
            <div className="bg-white">User</div>
            <div className={`d-flex ${styles.header}`}>
                <h1 className={styles.h1xl}>Ysana Capgemini</h1>
            </div>
        </>
    )
}