import type { Metadata } from "next"
import { HeroBanner } from "@/components/home/HeroBanner"
import { InstitutionalBlock } from "@/components/home/InstitutionalBlock"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { FeaturedPartners } from "@/components/home/FeaturedPartners"
import { LatestNews } from "@/components/home/LatestNews"
import { UpcomingEvents } from "@/components/home/UpcomingEvents"
import { CTABlock } from "@/components/home/CTABlock"
import { getActiveBanners } from "@/lib/queries/banners"
import { getSiteContent } from "@/lib/queries/site-content"
import { getCategories } from "@/lib/queries/categories"
import { getFeaturedAssociados } from "@/lib/queries/associados"
import { getLatestNoticias } from "@/lib/queries/noticias"
import { getUpcomingEventos } from "@/lib/queries/eventos"
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants"

export const revalidate = 60

export const metadata: Metadata = {
  title: `${SITE_NAME} | Portal do Turismo Alagoano`,
  description: SITE_DESCRIPTION,
}

export default async function HomePage() {
  const [banners, content, categories, featured, noticias, eventos] = await Promise.all([
    getActiveBanners(),
    getSiteContent([
      "home_institucional_title",
      "home_institucional_text",
      "home_cta_title",
      "home_cta_text",
    ]),
    getCategories(),
    getFeaturedAssociados(6),
    getLatestNoticias(3),
    getUpcomingEventos(4),
  ])

  return (
    <>
      <HeroBanner banners={banners} />
      <InstitutionalBlock
        title={content["home_institucional_title"]?.value_text ?? "Fortalecendo o Turismo de Alagoas"}
        text={content["home_institucional_text"]?.value_text ?? "O NúcleoTur Alagoas reúne as melhores empresas e profissionais do setor turístico alagoano."}
      />
      <CategoryGrid categories={categories} />
      <FeaturedPartners associados={featured} />
      <LatestNews noticias={noticias} />
      <UpcomingEvents eventos={eventos} />
      <CTABlock
        title={content["home_cta_title"]?.value_text ?? "Faça parte do NúcleoTur Alagoas"}
        text={content["home_cta_text"]?.value_text ?? "Associe-se e ganhe visibilidade, conexões e representatividade."}
      />
    </>
  )
}
