import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <div id='insLoadpage' className={styles.preloader}>
      <div className={styles.wrapLoading}>
        <div className={styles.loader}>Loading...</div>
      </div>
    </div>
  )
}

export default Loader
