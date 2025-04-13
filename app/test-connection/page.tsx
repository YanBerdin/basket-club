"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { getTeams, getEvents, getNews } from "@/lib/database"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, RefreshCw, Database } from "lucide-react"

export default function TestConnectionPage() {
  const [connectionStatus, setConnectionStatus] = useState<"loading" | "success" | "error" | "tables-missing">(
    "loading",
  )
  const [teams, setTeams] = useState([])
  const [events, setEvents] = useState([])
  const [news, setNews] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const testConnection = async () => {
    setIsLoading(true)
    setConnectionStatus("loading")
    setErrorMessage("")

    try {
      // Test simple de connexion à Supabase en vérifiant l'heure actuelle
      const { error: connectionError } = await supabase.from("_realtime").select("*").limit(1)

      // Si cette requête échoue pour des raisons autres que "relation does not exist",
      // alors c'est un problème de connexion général
      if (
        connectionError &&
        !connectionError.message.includes("relation") &&
        !connectionError.message.includes("does not exist")
      ) {
        throw connectionError
      }

      // Test spécifique pour vérifier si les tables du projet existent
      try {
        const { data, error } = await supabase.from("teams").select("count")

        if (error) {
          // Si l'erreur contient "relation does not exist", les tables n'ont pas été créées
          if (error.message && error.message.includes("relation") && error.message.includes("does not exist")) {
            setConnectionStatus("tables-missing")
            setErrorMessage("Les tables nécessaires n'ont pas été créées dans la base de données Supabase.")
            setIsLoading(false)
            return
          } else {
            throw error
          }
        }

        // Si la connexion fonctionne et que les tables existent, récupérer les données
        const [teamsData, eventsData, newsData] = await Promise.all([getTeams(), getEvents(), getNews(5)])

        setTeams(teamsData)
        setEvents(eventsData)
        setNews(newsData)
        setConnectionStatus("success")
      } catch (tableError) {
        // Vérifier si l'erreur est liée à l'absence de tables
        if (
          tableError.message &&
          tableError.message.includes("relation") &&
          tableError.message.includes("does not exist")
        ) {
          setConnectionStatus("tables-missing")
          setErrorMessage("Les tables nécessaires n'ont pas été créées dans la base de données Supabase.")
        } else {
          setConnectionStatus("error")
          setErrorMessage(tableError.message || "Une erreur est survenue lors de l'accès aux tables")
        }
      }
    } catch (error) {
      console.error("Erreur de connexion:", error)
      setConnectionStatus("error")
      setErrorMessage(error.message || "Une erreur est survenue lors de la connexion à Supabase")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <main className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold">Test de connexion Supabase</h1>
          <Button onClick={testConnection} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Test en cours...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" /> Tester à nouveau
              </>
            )}
          </Button>
        </div>

        {connectionStatus === "loading" && (
          <Alert className="mb-8">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <AlertTitle>Test de connexion en cours</AlertTitle>
            <AlertDescription>Veuillez patienter pendant que nous testons la connexion à Supabase...</AlertDescription>
          </Alert>
        )}

        {connectionStatus === "success" && (
          <Alert className="mb-8 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Connexion réussie</AlertTitle>
            <AlertDescription>
              La connexion à Supabase fonctionne correctement. Les données ont été récupérées avec succès.
            </AlertDescription>
          </Alert>
        )}

        {connectionStatus === "tables-missing" && (
          <Alert className="mb-8 bg-amber-50 border-amber-200">
            <Database className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-600">Tables manquantes</AlertTitle>
            <AlertDescription className="space-y-4">
              <p>
                La connexion à Supabase fonctionne, mais les tables nécessaires n&apos;ont pas été créées. Vous devez
                exécuter le script SQL pour créer les tables et insérer les données initiales.
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Connectez-vous à votre{" "}
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    tableau de bord Supabase
                  </a>
                </li>
                <li>Sélectionnez votre projet</li>
                <li>Allez dans la section &quot;SQL Editor&quot; dans le menu de gauche</li>
                <li>Créez une nouvelle requête en cliquant sur &quot;New query&quot;</li>
                <li>Copiez et collez le script SQL fourni précédemment</li>
                <li>Exécutez le script en cliquant sur &quot;Run&quot;</li>
                <li>Revenez à cette page et cliquez sur &quot;Tester à nouveau&quot;</li>
              </ol>
              <div className="bg-muted p-4 rounded-md mt-4">
                <p className="font-medium mb-2">Besoin du script SQL ?</p>
                <p>
                  Si vous n&apos;avez pas le script SQL, vous pouvez le retrouver dans les messages précédents de notre
                  conversation ou demander à le recevoir à nouveau.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {connectionStatus === "error" && (
          <Alert className="mb-8 bg-red-50 border-red-200">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-600">Erreur de connexion</AlertTitle>
            <AlertDescription className="space-y-4">
              <p>
                {errorMessage ||
                  "Une erreur est survenue lors de la connexion à Supabase. Veuillez vérifier vos identifiants."}
              </p>
              <div className="bg-muted p-4 rounded-md mt-4">
                <p className="font-medium mb-2">Vérifiez les points suivants :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Les variables d&apos;environnement NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont
                    correctement configurées
                  </li>
                  <li>Votre projet Supabase est actif et accessible</li>
                  <li>Vous n&apos;avez pas de restrictions réseau qui bloquent les connexions à Supabase</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {connectionStatus === "success" && (
          <Tabs defaultValue="teams">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="teams">Équipes ({teams.length})</TabsTrigger>
              <TabsTrigger value="events">Événements ({events.length})</TabsTrigger>
              <TabsTrigger value="news">Actualités ({news.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="teams">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                  <Card key={team.id}>
                    <CardHeader>
                      <CardTitle>{team.name}</CardTitle>
                      <CardDescription>{team.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Coach:</span> {team.coach}
                        </div>
                        <div>
                          <span className="font-medium">Championnat:</span> {team.championship}
                        </div>
                        <div>
                          <span className="font-medium">Horaires:</span> {team.schedule}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{team.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        {new Date(event.start_time).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Lieu:</span> {event.location}
                        </div>
                        <div>
                          <span className="font-medium">Horaire:</span>{" "}
                          {new Date(event.start_time).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(event.end_time).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div>
                          <span className="font-medium">Catégorie:</span>{" "}
                          {event.category === "match"
                            ? "Match"
                            : event.category === "training"
                              ? "Entraînement"
                              : event.category === "tournament"
                                ? "Tournoi"
                                : event.category === "meeting"
                                  ? "Réunion"
                                  : "Autre"}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="news">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article) => (
                  <Card key={article.id}>
                    <CardHeader>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>
                        {new Date(article.published_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                          {article.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{article.summary}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {connectionStatus === "success" && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Informations de connexion</CardTitle>
                <CardDescription>Détails sur la connexion à Supabase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">URL Supabase:</span>{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">
                      {process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/^https?:\/\//, "").split(".")[0]}...
                    </code>
                  </div>
                  <div>
                    <span className="font-medium">Clé anonyme:</span>{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">
                      {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 5)}...
                    </code>
                  </div>
                  <div>
                    <span className="font-medium">Équipes récupérées:</span> {teams.length}
                  </div>
                  <div>
                    <span className="font-medium">Événements récupérés:</span> {events.length}
                  </div>
                  <div>
                    <span className="font-medium">Actualités récupérées:</span> {news.length}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
