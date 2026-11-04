import { Container } from '../../components/ui/Container'
import { CountUp } from '../../components/ui/CountUp'
import { SectionHeading } from '../../components/ui/Heading'
import { Reveal } from '../../components/ui/Reveal'
import { resultados } from '../../content/home'

/** Capítulo 5 · resultados: cifras publicadas por Aula 20, en grande y en texto (no dentro de un banner). */
export function ResultadosChapter() {
  return (
    <section id="resultados" aria-labelledby="titulo-resultados" className="cuadricula-oscura py-20 text-white sm:py-28 dark:border-b dark:border-white/10">
      <Container>
        <SectionHeading id="titulo-resultados" tone="dark" eyebrow={resultados.eyebrow} title={resultados.title} />

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {resultados.procesos.map((proceso, index) => (
            <Reveal
              key={proceso.name}
              index={index}
              as="article"
              className={`rounded-3xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-9 ${index === 0 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
            >
              <h3 className="font-display text-xl font-bold">{proceso.name}</h3>
              <p className="text-sm text-cielo">{proceso.note}</p>
              <dl className={`mt-8 grid gap-8 ${index === 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {proceso.stats.map((stat, statIndex) => (
                  <div key={stat.label} className="flex flex-col-reverse">
                    <dt className="mt-2 text-sm leading-snug text-cielo">{stat.label}</dt>
                    <dd className={`font-display text-6xl leading-none font-extrabold tracking-tight ${statIndex === 0 ? 'text-menta' : 'text-white'}`}>
                      <CountUp to={stat.value} suffix={'suffix' in stat ? stat.suffix : ''} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-cielo">{resultados.source}</p>
      </Container>
    </section>
  )
}
