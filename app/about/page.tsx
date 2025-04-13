import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Calendar, Heart, Users } from "lucide-react"

export default function AboutPage() {
  // Exemple de membres de l'équipe dirigeante
  const teamMembers = [
    {
      name: "Jean Dupont",
      role: "Président",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Ancien joueur professionnel, Jean dirige le club depuis 2018 avec passion et détermination.",
    },
    {
      name: "Marie Martin",
      role: "Vice-présidente",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Impliquée dans le club depuis plus de 15 ans, Marie coordonne les activités sportives et les événements.",
    },
    {
      name: "Pierre Durand",
      role: "Trésorier",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Expert-comptable de profession, Pierre gère les finances du club avec rigueur et transparence.",
    },
    {
      name: "Sophie Petit",
      role: "Secrétaire",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Ancienne joueuse du club, Sophie s'occupe de l'administration et de la communication.",
    },
  ]

  return (
    <main className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Qui sommes-nous ?</h1>

        {/* Histoire du club */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-4">
                Fondé en 1975, le Réveil Basket Is sur Tille est né de la passion de quelques amateurs de basket-ball
                désireux de développer ce sport dans la région. Au fil des années, le club s&apos;est structuré et a
                grandi pour devenir une référence dans le département.
              </p>
              <p className="text-lg mb-4">
                Dans les années 90, le club a connu ses premiers succès significatifs avec plusieurs titres
                départementaux. La décennie 2000 a vu l&apos;émergence de notre section féminine qui s&apos;est
                rapidement hissée au niveau régional.
              </p>
              <p className="text-lg">
                Aujourd&apos;hui, fort de plus de 200 licenciés répartis dans toutes les catégories d&apos;âge, le
                Réveil Basket Is sur Tille continue de promouvoir les valeurs du basket-ball tout en visant
                l&apos;excellence sportive.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Histoire du club" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* Valeurs */}
        <section className="mb-16 bg-muted py-12 px-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Trophy className="h-8 w-8 text-primary" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Nous encourageons chaque joueur à donner le meilleur de lui-même, sur et en dehors du terrain.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <CardTitle>Esprit d&apos;équipe</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Le basket est un sport collectif où la cohésion et la solidarité sont essentielles à la réussite.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Heart className="h-8 w-8 text-primary" />
                <CardTitle>Respect</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Respect des coéquipiers, des adversaires, des arbitres et des règles du jeu.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <CardTitle>Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <p>L&apos;assiduité et l&apos;implication de chacun contribuent au développement du club.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Équipe dirigeante */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Notre équipe dirigeante</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p>{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Palmarès */}
        <section className="bg-muted py-12 px-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Notre palmarès</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-primary" /> Équipes seniors
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-bold mr-2">2023 :</span> Champions départementaux (Seniors Masculins)
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2022 :</span> Finalistes de la Coupe régionale (Seniors Féminines)
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2020 :</span> Montée en Régionale 2 (Seniors Masculins)
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2018 :</span> Champions départementaux (Seniors Féminines)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-primary" /> Équipes jeunes
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-bold mr-2">2024 :</span> Champions départementaux (U15 Masculins)
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2023 :</span> Finalistes régionaux (U17 Féminines)
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2021 :</span> Champions départementaux (U13 Mixte)
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2019 :</span> Vainqueurs du tournoi régional (U11)
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
