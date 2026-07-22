import postgres from "postgres";

/**
 * Conexión a la base de datos que administra el panel
 * (repo servicios-desarrollo-jc-admin, dueño del esquema).
 *
 * Singleton global para que el recargado en caliente de `next dev` no abra
 * una conexión nueva por cada edición de archivo.
 */
const globalForDb = globalThis as unknown as {
  __jcSql?: ReturnType<typeof postgres>;
};

export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Falta la variable DATABASE_URL");
  }
  globalForDb.__jcSql ??= postgres(process.env.DATABASE_URL, {
    max: 5,
    connect_timeout: 5,
  });
  return globalForDb.__jcSql;
}
