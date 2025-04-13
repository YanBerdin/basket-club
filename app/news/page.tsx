import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ChevronRight } from "lucide-react"

export default function NewsPage() {
  // Exemple d'actualités (à remplacer par des données dynamiques)
  const news = [
    {
      id: 1,
      title: "Victoire de l'équipe senior masculine",
      description:
        "Notre équipe senior masculine a remporté une victoire éclatante contre l'équipe de Dijon avec un score de 78-65. Une performance remarquable de notre capitaine qui a inscrit 25 points.",
      date: "15 avril 2025",
      image: "/placeholder.svg?height=200&width=400",
      category: "Match",
    },
    {
      id: 2,
      title: "Tournoi des jeunes ce weekend",
      description:
        "Ne manquez pas le tournoi des jeunes ce weekend au gymnase municipal. Plus de 10 équipes U11 et U13 s'affronteront dans une ambiance conviviale et sportive.",
      date: "10 avril 2025",
      image: "/placeholder.svg?height=200&width=400",
      category: "Événement",
    },
    {
      id: 3,
      title: "Inscriptions ouvertes pour la saison 2025-2026",
      description:
        "Les inscriptions pour la nouvelle saison sont désormais ouvertes. Rejoignez-nous pour une nouvelle année sportive riche en émotions et en partage.",
      date: "5 avril 2025",
      image: "/placeholder.svg?height=200&width=400",
      category: "Club",
    },
    {
      id: 4,
      title: "Stage de perfectionnement pendant les vacances",
      description:
        "Un stage de perfectionnement sera organisé pendant les vacances de printemps pour les catégories U13 à U17. Inscrivez-vous rapidement, les places sont limitées.",
      date: "1 avril 2025",
      image: "/placeholder.svg?height=200&width=400",
      category: "Formation",
    },
    {
      id: 5,
      title: "Nouveau partenariat avec Intersport",
      description:
        "Nous sommes heureux d'annoncer notre nouveau partenariat avec Intersport qui équipera nos équipes pour la saison prochaine. Des réductions seront proposées à nos licenciés.",
      date: "28 mars 2025",
      image: "/placeholder.svg?height=200&width=400",
      category: "Partenariat",
    },
    {
      id: 6,
      title: "Assemblée générale annuelle",
      description:
        "L'assemblée générale annuelle du club se tiendra le 15 mai à 19h à la salle des fêtes d'Is-sur-Tille. Votre présence est importante pour la vie du club.",
      date: "25 mars 2025",
      image: "/placeholder.svg?height=200&width=400",
      category: "Club",
    },
  ]

  // Exemple d'événements à venir
  const events = [
    {
      id: 101,
      title: "Tournoi des jeunes",
      date: "20-21 avril 2025",
      location: "Gymnase municipal",
      description: "Tournoi pour les catégories U11 et U13",
    },
    {
      id: 102,
      title: "Stage de perfectionnement",
      date: "24-28 avril 2025",
      location: "Gymnase du Réveil",
      description: "Stage pour les catégories U13 à U17",
    },
    {
      id: 103,
      title: "Assemblée générale",
      date: "15 mai 2025",
      location: "Salle des fêtes",
      description: "Bilan de la saison et perspectives",
    },
    {
      id: 104,
      title: "Fête du club",
      date: "18 juin 2025",
      location: "Complexe sportif",
      description: "Animations, matchs et barbecue",
    },
  ]

  return (
    <main className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Actualités & Événements</h1>

        {/* Section Événements à venir */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Événements à venir</h2>
          <div className="bg-muted p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <CalendarDays className="mr-2 h-4 w-4" /> {event.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm font-medium">Lieu: {event.location}</p>
                    <p className="text-sm">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/events/${event.id}`}>Détails</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild>
                <Link href="/calendar">Voir tous les événements</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section Actualités */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Dernières actualités</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    {item.category}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" /> {item.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link href={`/news/${item.id}`}>Lire la suite</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              Articles plus anciens <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
