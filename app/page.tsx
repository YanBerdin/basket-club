import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ChevronRight, Trophy, Users } from "lucide-react"

export default function Home() {
  // Exemple d'actualités (à remplacer par des données dynamiques)
  const news = [
    {
      id: 1,
      title: "Victoire de l'équipe senior masculine",
      description: "Notre équipe senior masculine a remporté une victoire éclatante contre l'équipe de Dijon.",
      date: "15 avril 2025",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Tournoi des jeunes ce weekend",
      description: "Ne manquez pas le tournoi des jeunes ce weekend au gymnase municipal.",
      date: "10 avril 2025",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Inscriptions ouvertes pour la saison 2025-2026",
      description: "Les inscriptions pour la nouvelle saison sont désormais ouvertes. Rejoignez-nous !",
      date: "5 avril 2025",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <main>
      {/* Bannière principale */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Joueurs de basket en action"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Réveil Basket Is sur Tille</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">Passion, esprit d&apos;équipe et dépassement de soi</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/teams">Nos équipes</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg bg-transparent text-white hover:bg-white hover:text-black"
            >
              <Link href="/contact">Nous rejoindre</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Actualités */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Actualités & Événements</h2>
          <Button asChild variant="ghost">
            <Link href="/news" className="flex items-center">
              Toutes les actualités <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4" /> {item.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <Link href={`/news/${item.id}`}>Lire la suite</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Section Présentation */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre club</h2>
            <p className="text-lg mb-4">
              Depuis sa création, le Réveil Basket Is sur Tille s&apos;engage à promouvoir les valeurs du basket-ball et
              à former les jeunes talents de notre région.
            </p>
            <p className="text-lg mb-6">
              Notre club accueille des joueurs de tous âges et de tous niveaux, dans une ambiance conviviale et
              familiale.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-primary" />
                <span className="font-medium">Plus de 200 licenciés</span>
              </div>
              <div className="flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-primary" />
                <span className="font-medium">Multiples titres régionaux</span>
              </div>
            </div>
            <Button asChild className="mt-6">
              <Link href="/about">En savoir plus</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Équipe du Réveil Basket"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section Partenaires */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos partenaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-center">
              <Image
                src="/placeholder.svg?height=80&width=160"
                alt={`Partenaire ${i}`}
                width={160}
                height={80}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/contact">Devenir partenaire</Link>
          </Button>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez l&apos;aventure !</h2>
          <p className="text-xl mb-8">
            Que vous soyez débutant ou confirmé, rejoignez notre club et partagez notre passion pour le basket-ball.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link href="/contact">S&apos;inscrire maintenant</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
