
import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div className={styles.header}>
          <h2 className={styles.title}>
            Calculadora General
          </h2>
          <span className={styles.subtitle}>
            Proyecto Personal
          </span>
        </div>

        <div className={styles.list}>
          <div className={styles.listTitle}>
            Opciones
          </div>

          <a href="/efectividades">
            Verificar Efectividades
          </a>

          <a href="/estadisticas">
            Calcular Estadísticas
          </a>

          <a href="/aleatorio">
            Generar un Número Aleatorio
          </a>
        </div>

      </main>
    </div>
  );
}
