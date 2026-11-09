import { Container } from '../../components/ui/Container'
import { CountUp } from '../../components/ui/CountUp'
import { SectionHeading } from '../../components/ui/Heading'
import { Reveal } from '../../components/ui/Reveal'
import { resultados } from '../../content/home'

/**
 * Capítulo 5 · resultados: cifras publicadas por Aula 20, en grande y en texto (no dentro de un banner).
 * Sigue el tema (2026-11-09: en modo claro se veía oscuro): franja azul clara con hojas blancas en claro y azul noche
 * en oscuro. La cifra principal va en azul de marca en claro y en menta en oscuro.
 */
export function ResultadosChapter() {
  return (
    <section id="resultados" aria-labelledby="titulo-resultados" className="banda-resultados py-20 sm:py-28 dark:border-b dark:border-white/10">
      <Container>
        <SectionHeading id="titulo-resultados" eyebrow={resultados.eyebrow} title={resultados.title} />

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {resultados.procesos.map((proceso, index) => (
            <Reveal
              key={proceso.name}
              index={index}
              as="article"
              className={`rounded-3xl border border-linea bg-hoja p-7 sm:p-9 ${index === 0 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
            >
              <h3 className="font-display text-xl font-bold text-titulo">{proceso.name}</h3>
              <p className="text-sm text-grafito-600">{proceso.note}</p>
              {/* Cifras arriba y alineadas entre sí; la etiqueta debajo (el orden del HTML sigue siendo dt → dd). */}
              <dl className={`mt-8 grid gap-x-8 gap-y-8 ${index === 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {proceso.stats.map((stat, statIndex) => (
                  <div key={stat.label} className="flex flex-col">
                    <dt className="mt-2 text-sm leading-snug text-grafito-600">{stat.label}</dt>
                    <dd
                      className={`order-first font-display text-5xl leading-none font-extrabold tracking-tight tabular-nums xl:text-6xl ${
                        statIndex === 0 ? 'text-acento dark:text-menta' : 'text-titulo'
                      }`}
                    >
                      <CountUp to={stat.value} suffix={'suffix' in stat ? stat.suffix : ''} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-grafito-600">{resultados.source}</p>
      </Container>
    </section>
  )
}
