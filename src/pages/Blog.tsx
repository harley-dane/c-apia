import { useTranslation } from "react-i18next";
import indegino from "../assets/indegino.jpg";

function Blog() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-no-repeat bg-top py-40 text-center min-h-[500px]"
        style={{ backgroundImage: `url(${indegino})` }}
        role="banner"
        aria-label={t("heroSection")}
      >
        <div className="container mx-auto bg-red-600 bg-opacity-75 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300">
          <h1 className="text-2xl md:text-2xl font-bold mb-4">
            {t(
              "Coordinadora de Pueblos Indígenas y Afrodescendientes - A-CPIA"
            )}
          </h1>
          <p className="text-lg md:text-xl">{t("Nuestro mission")}</p>
        </div>
      </div>

      {/* Blog Article */}
      <section className="container mx-auto py-8 px-4">
        <article className="prose max-w-3xl mx-auto">
          <h2>
            Coordinadora de Pueblos Indígenas y Afrodescendientes - A-CPIA
          </h2>
          <h3>Año de retos y desafíos de la colonialidad interna y externa</h3>
          <p className="text-gray-600 italic">
            Contacto: ramontylor52@gmail.com, ramalands@gmail.com,
            coordinadoracpias@gmail.com | Teléfono: +506 6228 3602
          </p>

          <h4>Perfil Institucional</h4>
          <p>
            <strong>
              Asociación Coordinadora de los Pueblos Indígenas y
              Afrodescendientes de Nicaragua (A-CPIA)
            </strong>
            <br />
            <strong>Dirección:</strong> Provincia Alajuela, Cantón Alajuela,
            Distrito Alajuela, Barrio El Carmen
            <br />
            <strong>Correo electrónico:</strong> mayaramaacpia@gmail.com
            <br />
            <strong>Teléfono:</strong> +506 6228 3602
            <br />
            <strong>Fecha de Fundación:</strong> 1 de noviembre de 2023
            <br />
            <strong>Presidente:</strong> Baldivio Ramón Taylor
          </p>

          <h4>Resumen Ejecutivo</h4>
          <p>
            La Asociación Coordinadora de los Pueblos Indígenas y
            Afrodescendientes de Nicaragua (A-CPIA) es una organización
            interétnica que defiende y promueve los derechos colectivos de los
            pueblos indígenas y afrodescendientes de la Costa Caribe
            nicaragüense. Representamos a más de 650,000 personas de 7 pueblos,
            articulando a través de 47 Gobiernos Territoriales y 635
            organizaciones. Nuestro objetivo es defender sus derechos
            territoriales, culturales, sociales y económicos, promoviendo el
            desarrollo de acuerdo a su cosmovisión y forma de vida.
          </p>

          <h4>Nuestra Historia y Contexto</h4>
          <p>
            Históricamente, los pueblos indígenas y afrodescendientes de
            Nicaragua han sufrido marginación y la invasión de sus tierras
            ancestrales. El contexto actual se caracteriza por el despojo
            territorial, la criminalización de líderes y la violencia ejercida
            por grupos de colonos. A-CPIA nace como una plataforma para
            organizar y visibilizar la resistencia de estos pueblos, y
            protegerlos de la agresión estatal y la amenaza a su existencia y
            cultura. Este proceso está agravado por un racismo estructural que
            busca suprimir las identidades y tradiciones de los pueblos
            originarios. A pesar de que la ley nicaragüense reconoce la
            propiedad colectiva de las tierras, el gobierno ha otorgado
            concesiones a empresas privadas, lo que intensifica la invasión y la
            explotación de los recursos naturales.
          </p>

          <h4>Misión, Visión y Propósito</h4>
          <ul>
            <li>
              <strong>Misión:</strong> Ser una organización nacional e
              internacional que busca el autodesarrollo de las comunidades
              indígenas y afrodescendientes. Esto incluye el apoyo a grupos
              vulnerables como personas con discapacidades, adultos mayores,
              mujeres, niños, adolescentes, migrantes, refugiados y miembros de
              la comunidad LGBTQIA+.
            </li>
            <li>
              <strong>Visión:</strong> Ser una organización consolidada y
              responsable que protege y vigila los derechos humanos de estos
              grupos. Fomentamos el etnodesarrollo de las comunidades,
              promoviendo una vida en armonía con la naturaleza y el medio
              ambiente, y asegurando el cumplimiento de los derechos humanos
              declarados por las Naciones Unidas.
            </li>
            <li>
              <strong>Propósito:</strong> Defender y promover los derechos
              colectivos de los pueblos indígenas y afrodescendientes de
              Nicaragua, actuando como su vocero para exponer problemáticas y
              presentar propuestas de desarrollo que respeten su cosmovisión.
            </li>
          </ul>

          <h4>Estructura y Organización</h4>
          <p>
            A-CPIA se estructura de manera horizontal, con una base territorial
            fuerte:
          </p>
          <ul>
            <li>
              <strong>Asamblea General:</strong> Máxima autoridad de la
              organización.
            </li>
            <li>
              <strong>Consejo Directivo Nacional:</strong> Elegido por las bases
              territoriales cada 2 años.
            </li>
            <li>
              <strong>380 Gobiernos comunales:</strong> Representan a las
              diferentes pueblos y zonas de la Reserva Indígena de Bosawás y
              Indio Maíz.
            </li>
            <li>
              <strong>47 Gobiernos Territoriales:</strong> Articulan a las
              comunidades a nivel local.
            </li>
            <li>
              <strong>Población demográfica:</strong> 650,000 personas.
            </li>
          </ul>

          <h4>Alianzas y Marco Legal</h4>
          <p>
            Trabajamos en estrecha colaboración con otras organizaciones
            indígenas, ONGs, agencias de cooperación internacional y entidades
            del Estado. Nuestras acciones se fundamentan en marcos legales
            nacionales e internacionales que reconocen los derechos de los
            pueblos indígenas, como el Convenio 169 de la OIT y la Declaración
            de las Naciones Unidas sobre los Derechos de los Pueblos Indígenas.
          </p>
        </article>
      </section>
    </div>
  );
}

export default Blog;
