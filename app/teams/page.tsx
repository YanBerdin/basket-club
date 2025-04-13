import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Trophy } from "lucide-react"

export default function TeamsPage() {
  // Exemple de données pour les équipes
  const teams = {
    masculine: [
      {
        id: "seniors-m",
        name: "Seniors Masculins",
        category: "Seniors",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Thomas Dubois",
        championship: "Régionale 2",
        schedule: "Entraînements : Mardi et Jeudi 20h-22h",
        description:
          "Notre équipe fanion masculine évolue en Régionale 2. Composée de joueurs expérimentés et de jeunes talents, elle vise la montée en Régionale 1.",
      },
      {
        id: "u17-m",
        name: "U17 Masculins",
        category: "Cadets",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Philippe Martin",
        championship: "Départemental",
        schedule: "Entraînements : Mercredi 18h-20h et Vendredi 17h-19h",
        description:
          "Nos U17 masculins forment une équipe prometteuse qui progresse rapidement. Ils participent au championnat départemental avec l'objectif d'accéder au niveau régional.",
      },
      {
        id: "u15-m",
        name: "U15 Masculins",
        category: "Minimes",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Laurent Petit",
        championship: "Départemental",
        schedule: "Entraînements : Mercredi 16h-18h et Samedi 10h-12h",
        description:
          "L'équipe U15 masculine est composée de jeunes joueurs talentueux qui développent leurs compétences techniques et tactiques. Champions départementaux en titre.",
      },
      {
        id: "u13-m",
        name: "U13 Masculins",
        category: "Benjamins",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Julien Moreau",
        championship: "Départemental",
        schedule: "Entraînements : Mercredi 14h-16h et Samedi 9h-10h30",
        description:
          "Notre équipe U13 masculine met l'accent sur l'apprentissage des fondamentaux du basket et le développement du jeu collectif.",
      },
    ],
    feminine: [
      {
        id: "seniors-f",
        name: "Seniors Féminines",
        category: "Seniors",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Caroline Dumont",
        championship: "Régionale 3",
        schedule: "Entraînements : Lundi et Mercredi 20h-22h",
        description:
          "Notre équipe senior féminine évolue en Régionale 3. Composée d'un mélange de joueuses expérimentées et de jeunes talents, elle vise le haut du classement.",
      },
      {
        id: "u17-f",
        name: "U17 Féminines",
        category: "Cadettes",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Sophie Leroy",
        championship: "Régionale",
        schedule: "Entraînements : Mardi 18h-20h et Jeudi 18h-20h",
        description:
          "Les U17 féminines évoluent au niveau régional. Finalistes du championnat la saison dernière, elles visent le titre cette année.",
      },
      {
        id: "u15-f",
        name: "U15 Féminines",
        category: "Minimes",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Émilie Blanc",
        championship: "Départemental",
        schedule: "Entraînements : Mercredi 16h-18h et Vendredi 17h30-19h",
        description:
          "L'équipe U15 féminine progresse rapidement et développe un jeu collectif prometteur. Elles visent une qualification pour les phases finales départementales.",
      },
      {
        id: "u13-f",
        name: "U13 Féminines",
        category: "Benjamines",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Marie Rousseau",
        championship: "Départemental",
        schedule: "Entraînements : Mercredi 14h-16h et Samedi 10h30-12h",
        description:
          "Notre équipe U13 féminine se concentre sur l'apprentissage des fondamentaux et le développement de l'esprit d'équipe.",
      },
    ],
    jeunes: [
      {
        id: "u11",
        name: "U11 Mixte",
        category: "Poussins/Poussines",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Nicolas Girard",
        championship: "Départemental",
        schedule: "Entraînements : Mercredi 13h30-15h et Samedi 9h-10h30",
        description:
          "L'équipe U11 mixte participe à des plateaux départementaux. L'accent est mis sur l'apprentissage des règles et le plaisir de jouer.",
      },
      {
        id: "u9",
        name: "U9 Mixte",
        category: "Mini-Poussins/Mini-Poussines",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Aurélie Dupuis",
        championship: "Plateaux d'initiation",
        schedule: "Entraînements : Samedi 10h30-12h",
        description:
          "Les U9 découvrent le basket à travers des jeux et des exercices ludiques. Ils participent à des plateaux d'initiation plusieurs fois dans l'année.",
      },
      {
        id: "u7",
        name: "U7 Mixte",
        category: "Baby Basket",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Stéphanie Mercier",
        championship: "Éveil au basket",
        schedule: "Entraînements : Samedi 9h-10h",
        description:
          "Le Baby Basket permet aux plus petits de découvrir le sport à travers des jeux et des parcours moteurs adaptés à leur âge.",
      },
    ],
    loisir: [
      {
        id: "loisir-adultes",
        name: "Basket Loisir Adultes",
        category: "Loisir",
        image: "/placeholder.svg?height=300&width=500",
        coach: "Auto-géré",
        championship: "Pas de compétition",
        schedule: "Entraînements : Vendredi 20h-22h",
        description:
          "La section loisir adultes permet de pratiquer le basket dans une ambiance détendue et conviviale, sans la pression de la compétition.",
      },
    ],
  }

  return (
    <main className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Nos équipes</h1>

        <p className="text-lg mb-8">
          Le Réveil Basket Is sur Tille compte de nombreuses équipes dans toutes les catégories d&apos;âge, des plus
          jeunes aux seniors, en masculin comme en féminin. Découvrez nos équipes ci-dessous.
        </p>

        <Tabs defaultValue="masculine" className="mb-16">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="masculine">Équipes Masculines</TabsTrigger>
            <TabsTrigger value="feminine">Équipes Féminines</TabsTrigger>
            <TabsTrigger value="jeunes">École de Basket</TabsTrigger>
            <TabsTrigger value="loisir">Basket Loisir</TabsTrigger>
          </TabsList>

          {Object.entries(teams).map(([category, categoryTeams]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categoryTeams.map((team) => (
                  <Card key={team.id} className="overflow-hidden">
                    <div className="relative h-64 w-full">
                      <Image src={team.image || "/placeholder.svg"} alt={team.name} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{team.name}</span>
                        <span className="text-sm font-normal text-muted-foreground">{team.category}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Coach</p>
                          <p>{team.coach}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Championnat</p>
                          <p>{team.championship}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Horaires</p>
                        <p>{team.schedule}</p>
                      </div>
                      <p>{team.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline">
                        <Link href={`/teams/${team.id}`}>Voir l&apos;équipe</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Calendrier des matchs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <CalendarDays className="mr-2 h-6 w-6 text-primary" /> Calendrier des matchs
          </h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-lg mb-4">
              Retrouvez ci-dessous les prochains matchs de nos équipes. Venez nombreux les encourager !
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Équipe</th>
                    <th className="py-3 px-4 text-left">Adversaire</th>
                    <th className="py-3 px-4 text-left">Lieu</th>
                    <th className="py-3 px-4 text-left">Heure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">20/04/2025</td>
                    <td className="py-3 px-4">Seniors Masculins</td>
                    <td className="py-3 px-4">BC Dijon</td>
                    <td className="py-3 px-4">Domicile</td>
                    <td className="py-3 px-4">20h30</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">21/04/2025</td>
                    <td className="py-3 px-4">U17 Féminines</td>
                    <td className="py-3 px-4">Auxonne Basket</td>
                    <td className="py-3 px-4">Extérieur</td>
                    <td className="py-3 px-4">15h00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">27/04/2025</td>
                    <td className="py-3 px-4">Seniors Féminines</td>
                    <td className="py-3 px-4">Chenôve BC</td>
                    <td className="py-3 px-4">Domicile</td>
                    <td className="py-3 px-4">18h00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">28/04/2025</td>
                    <td className="py-3 px-4">U15 Masculins</td>
                    <td className="py-3 px-4">Genlis Basket</td>
                    <td className="py-3 px-4">Extérieur</td>
                    <td className="py-3 px-4">14h00</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">04/05/2025</td>
                    <td className="py-3 px-4">U13 Féminines</td>
                    <td className="py-3 px-4">Fontaine BC</td>
                    <td className="py-3 px-4">Domicile</td>
                    <td className="py-3 px-4">10h30</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Button asChild>
                <Link href="/calendar">Voir le calendrier complet</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Classements */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Trophy className="mr-2 h-6 w-6 text-primary" /> Classements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Seniors Masculins - Régionale 2</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-3 text-left">Pos.</th>
                        <th className="py-2 px-3 text-left">Équipe</th>
                        <th className="py-2 px-3 text-left">Pts</th>
                        <th className="py-2 px-3 text-left">J</th>
                        <th className="py-2 px-3 text-left">G</th>
                        <th className="py-2 px-3 text-left">P</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-3">1</td>
                        <td className="py-2 px-3">BC Dijon</td>
                        <td className="py-2 px-3">36</td>
                        <td className="py-2 px-3">18</td>
                        <td className="py-2 px-3">18</td>
                        <td className="py-2 px-3">0</td>
                      </tr>
                      <tr className="border-b bg-muted">
                        <td className="py-2 px-3 font-bold">2</td>
                        <td className="py-2 px-3 font-bold">Réveil Basket</td>
                        <td className="py-2 px-3 font-bold">32</td>
                        <td className="py-2 px-3 font-bold">18</td>
                        <td className="py-2 px-3 font-bold">14</td>
                        <td className="py-2 px-3 font-bold">4</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">3</td>
                        <td className="py-2 px-3">Chenôve BC</td>
                        <td className="py-2 px-3">30</td>
                        <td className="py-2 px-3">18</td>
                        <td className="py-2 px-3">12</td>
                        <td className="py-2 px-3">6</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">4</td>
                        <td className="py-2 px-3">Auxonne Basket</td>
                        <td className="py-2 px-3">28</td>
                        <td className="py-2 px-3">18</td>
                        <td className="py-2 px-3">10</td>
                        <td className="py-2 px-3">8</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">5</td>
                        <td className="py-2 px-3">Genlis Basket</td>
                        <td className="py-2 px-3">26</td>
                        <td className="py-2 px-3">18</td>
                        <td className="py-2 px-3">8</td>
                        <td className="py-2 px-3">10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href="/rankings">Voir le classement complet</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Seniors Féminines - Régionale 3</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-3 text-left">Pos.</th>
                        <th className="py-2 px-3 text-left">Équipe</th>
                        <th className="py-2 px-3 text-left">Pts</th>
                        <th className="py-2 px-3 text-left">J</th>
                        <th className="py-2 px-3 text-left">G</th>
                        <th className="py-2 px-3 text-left">P</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-3">1</td>
                        <td className="py-2 px-3">Chenôve BC</td>
                        <td className="py-2 px-3">34</td>
                        <td className="py-2 px-3">18</td>
                        <td className="py-2 px-3">16</td>
                        <td className="py-2 px-3">2</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">2</td>
                        <td className="py-2 px-3">BC Dijon</td>
                        <td className="py-2 px-3">32</td>
                        <td className="py-2 px-3">18</td>
                        <td className="py-2 px-3">14</td>
                        <td className="py-2 px-3">4</td>
                      </tr>
                      <tr className="border-b bg-muted">
                        <td className="py-2 px-3 font-bold">3</td>
                        <td className="py-2 px-3 font-bold">Réveil Basket</td>
                        <td className="py-2 px-3 font-bold">30</td>
                        <td className="py-2 px-3 font-bold">18</td>
                        <td className="py-2 px-3 font-bold">12</td>
                        <td className="py-2 px-3 font-bold">6</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">4</td>
                        <td className="py-2 px-3">Fontaine BC</td>
                        <td className="py-2 px-3">26</td>
                        <td className="py-2 px-3">18</td>
                        <td className="py-2 px-3">8</td>
                        <td className="py-2 px-3">10</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">5</td>
                        <td className="py-2 px-3">Auxonne Basket</td>
                        <td className="py-2 px-3">24</td>
                        <td className="py-2 px-3">18</td>
                        <td className="py-2 px-3">6</td>
                        <td className="py-2 px-3">12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href="/rankings">Voir le classement complet</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
