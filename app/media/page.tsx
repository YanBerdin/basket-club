"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

export default function MediaPage() {
  // Exemple de galeries photos
  const photoGalleries = {
    matches: [
      {
        id: 1,
        title: "Match Seniors Masculins vs BC Dijon",
        date: "15 avril 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 2,
        title: "Match U17 Féminines vs Auxonne",
        date: "21 mars 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 3,
        title: "Match Seniors Féminines vs Chenôve",
        date: "10 mars 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 4,
        title: "Match U15 Masculins vs Genlis",
        date: "28 février 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 5,
        title: "Match U13 Féminines vs Fontaine",
        date: "15 février 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 6,
        title: "Match Seniors Masculins vs Auxonne",
        date: "5 février 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 7,
        title: "Match Seniors Masculins vs Auxonne",
        date: "5 février 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    events: [
      {
        id: 7,
        title: "Tournoi des jeunes 2025",
        date: "20 avril 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 8,
        title: "Stage de perfectionnement",
        date: "24 avril 2025",
        image: "/placeholder.svg?height=300&width=400",
      },
      { id: 9, title: "Fête du club 2024", date: "18 juin 2024", image: "/placeholder.svg?height=300&width=400" },
      { id: 10, title: "Assemblée générale 2024", date: "15 mai 2024", image: "/placeholder.svg?height=300&width=400" },
      { id: 11, title: "Noël du club", date: "18 décembre 2024", image: "/placeholder.svg?height=300&width=400" },
      { id: 12, title: "Tournoi de fin d'année", date: "28 juin 2024", image: "/placeholder.svg?height=300&width=400" },
    ],
    teams: [
      {
        id: 13,
        title: "Équipe Seniors Masculins 2024-2025",
        date: "Septembre 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 14,
        title: "Équipe Seniors Féminines 2024-2025",
        date: "Septembre 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 15,
        title: "Équipe U17 Masculins 2024-2025",
        date: "Septembre 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 16,
        title: "Équipe U17 Féminines 2024-2025",
        date: "Septembre 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 17,
        title: "École de basket 2024-2025",
        date: "Octobre 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 18,
        title: "Staff technique 2024-2025",
        date: "Septembre 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  }

  // Exemple de vidéos
  const videos = [
    {
      id: 1,
      title: "Highlights Seniors Masculins vs BC Dijon",
      date: "15 avril 2025",
      thumbnail: "/placeholder.svg?height=300&width=400",
      url: "#",
    },
    {
      id: 2,
      title: "Interview du coach après la victoire",
      date: "15 avril 2025",
      thumbnail: "/placeholder.svg?height=300&width=400",
      url: "#",
    },
    {
      id: 3,
      title: "Résumé du tournoi des jeunes",
      date: "21 avril 2025",
      thumbnail: "/placeholder.svg?height=300&width=400",
      url: "#",
    },
    {
      id: 4,
      title: "Techniques d'entraînement - Tirs",
      date: "5 mars 2025",
      thumbnail: "/placeholder.svg?height=300&width=400",
      url: "#",
    },
    {
      id: 5,
      title: "Présentation de la saison 2024-2025",
      date: "15 septembre 2024",
      thumbnail: "/placeholder.svg?height=300&width=400",
      url: "#",
    },
    {
      id: 6,
      title: "Fête du club - Les moments forts",
      date: "20 juin 2024",
      thumbnail: "/placeholder.svg?height=300&width=400",
      url: "#",
    },
  ]

  const [selectedImage, setSelectedImage] = useState<{ id: number; title: string; date: string; image: string } | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentGallery, setCurrentGallery] = useState<{ id: number; title: string; date: string; image: string }[]>([])

  const openGallery = (images: { id: number; title: string; date: string; image: string }[], index: number) => {
    setCurrentGallery(images)
    setCurrentIndex(index)
    setSelectedImage(images[index])
  }

  const navigateGallery = (direction: "next" | "prev") => {
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % currentGallery.length
        : (currentIndex - 1 + currentGallery.length) % currentGallery.length

    setCurrentIndex(newIndex)
    setSelectedImage(currentGallery[newIndex])
  }

  return (
    <main className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Galerie média</h1>

        <Tabs defaultValue="photos" className="mb-16">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Vidéos</TabsTrigger>
          </TabsList>

          <TabsContent value="photos">
            <div className="space-y-12">
              {Object.entries(photoGalleries).map(([category, images]) => (
                <section key={category} className="space-y-4">
                  <h2 className="text-2xl font-bold capitalize">
                    {category === "matches" ? "Matchs" : category === "events" ? "Événements" : "Équipes"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <Dialog key={image.id}>
                        <DialogTrigger asChild>
                          <Card
                            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => openGallery(images, index)}
                          >
                            <div className="relative h-48 w-full">
                              <Image
                                src={image.image || "/placeholder.svg"}
                                alt={image.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium">{image.title}</h3>
                              <p className="text-sm text-muted-foreground">{image.date}</p>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <div className="relative">
                            <div className="relative h-[60vh] w-full">
                              <Image
                                src={selectedImage?.image || image.image}
                                alt={selectedImage?.title || image.title}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                              onClick={() => navigateGallery("prev")}
                            >
                              <ChevronLeft className="h-6 w-6" />
                              <span className="sr-only">Image précédente</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                              onClick={() => navigateGallery("next")}
                            >
                              <ChevronRight className="h-6 w-6" />
                              <span className="sr-only">Image suivante</span>
                            </Button>
                          </div>
                          <div className="text-center mt-2">
                            <h3 className="font-medium text-lg">{selectedImage?.title || image.title}</h3>
                            <p className="text-sm text-muted-foreground">{selectedImage?.date || image.date}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button variant="outline">Voir plus de photos</Button>
                  </div>
                </section>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Dialog key={video.id}>
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                      <div className="relative h-48 w-full group">
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                          <div className="rounded-full bg-primary/80 p-3">
                            <Play className="h-6 w-6 text-primary-foreground" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.date}</p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
                      <Play className="h-12 w-12 text-muted-foreground" />
                      <p className="absolute bottom-4 text-center w-full text-muted-foreground">
                        Lecture vidéo (simulation)
                      </p>
                    </div>
                    <div className="text-center mt-2">
                      <h3 className="font-medium text-lg">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.date}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline">Voir plus de vidéos</Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Section YouTube */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Notre chaîne YouTube</h2>
          <div className="bg-muted p-6 rounded-lg text-center">
            <p className="text-lg mb-4">
              Retrouvez toutes nos vidéos sur notre chaîne YouTube : interviews, résumés de matchs, techniques
              d&apos;entraînement...
            </p>
            <Button asChild>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                Visiter notre chaîne
              </a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
