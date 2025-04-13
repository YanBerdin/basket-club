"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signOut } from "@/lib/auth"
import { toast } from "@/components/ui/use-toast"
import { FileText, Loader2 } from "lucide-react"

export default function MemberAreaPage() {
  const { user, loading, clearSession } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Utiliser useRef pour suivre si les données utilisateur ont déjà été définies
  const userDataInitialized = useRef(false)
  // Utiliser useRef pour suivre si une redirection a déjà été tentée
  const redirectAttempted = useRef(false)
  // Utiliser useRef pour suivre si le composant est monté
  const isMounted = useRef(true)

  useEffect(() => {
    // Réinitialiser le statut de montage
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    // Éviter les redirections en boucle
    if (redirectAttempted.current) return

    // Rediriger seulement si le chargement est terminé et qu'il n'y a pas d'utilisateur
    if (!loading && !user) {
      console.log("Utilisateur non connecté, redirection vers /login")
      redirectAttempted.current = true
      router.replace("/login") // Utiliser `replace` au lieu de `push` pour éviter d'empiler l'historique
      return
    }

    // Charger les données de l'utilisateur seulement si l'utilisateur existe et que les données n'ont pas encore été initialisées
    if (!loading && user && !userDataInitialized.current) {
      console.log("Utilisateur connecté, initialisation des données:", user.id)
      userDataInitialized.current = true

      // Définir les données utilisateur une seule fois
      if (isMounted.current) {
        setUserData({
          firstName: user.user_metadata?.first_name || "Membre",
          lastName: user.user_metadata?.last_name || "",
          role: user.user_metadata?.role || "member",
          email: user.email,
        })
      }
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    if (isMounted.current) {
      setIsLoading(true)
    }

    try {
      // Nettoyer d'abord la session dans le contexte d'authentification
      clearSession()

      // Appeler la fonction de déconnexion
      await signOut()

      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      })

      // Rediriger vers la page d'accueil
      redirectAttempted.current = true
      router.push("/")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)

      toast({
        title: "Déconnexion effectuée",
        description: "Vous avez été déconnecté.",
      })

      // Rediriger quand même
      redirectAttempted.current = true
      router.push("/")
    } finally {
      if (isMounted.current) {
        setIsLoading(false)
      }
    }
  }

  // Afficher un état de chargement pendant la vérification de l'authentification
  if (loading || !userData) {
    return (
      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <h1 className="text-2xl font-bold">Chargement de votre espace membre...</h1>
            <p className="text-muted-foreground mt-2">
              Veuillez patienter pendant que nous récupérons vos informations.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold">Bienvenue, {userData.firstName}</h1>
          <Button variant="outline" onClick={handleSignOut} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Déconnexion...
              </>
            ) : (
              "Se déconnecter"
            )}
          </Button>
        </div>

        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="profile">Mon profil</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Prochains événements</CardTitle>
                  <CardDescription>Événements à venir pour votre équipe</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Aucun événement à venir</p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Voir le calendrier complet
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Dernières actualités</CardTitle>
                  <CardDescription>Restez informé des dernières nouvelles</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Aucune actualité récente</p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Voir toutes les actualités
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Documents importants</CardTitle>
                  <CardDescription>Accédez rapidement aux documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Button variant="link" className="p-0 h-auto">
                        Règlement intérieur
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto">
                        Calendrier des matchs
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto">
                        Formulaire de remboursement
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Messages de l&apos;équipe</CardTitle>
                  <CardDescription>Communications internes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Aucun message récent</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Mon profil</CardTitle>
                <CardDescription>Gérez vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Informations personnelles</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Nom</div>
                        <div className="col-span-2">{userData.lastName}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Prénom</div>
                        <div className="col-span-2">{userData.firstName}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Email</div>
                        <div className="col-span-2">{userData.email}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Rôle</div>
                        <div className="col-span-2">
                          {userData.role === "admin"
                            ? "Administrateur"
                            : userData.role === "coach"
                              ? "Entraîneur"
                              : "Membre"}
                        </div>
                      </div>
                    </div>
                    <Button className="mt-4">Modifier mes informations</Button>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Équipe</h3>
                    <p className="text-muted-foreground">Vous n&apos;êtes pas encore assigné à une équipe.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Changer de mot de passe</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pour des raisons de sécurité, choisissez un mot de passe fort que vous n&apos;utilisez pas ailleurs.
                  </p>
                  <Button variant="outline">Changer mon mot de passe</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Accédez aux documents du club</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Documents administratifs</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Button variant="link" className="p-0 h-auto">
                          Règlement intérieur
                        </Button>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Button variant="link" className="p-0 h-auto">
                          Statuts de l&apos;association
                        </Button>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Button variant="link" className="p-0 h-auto">
                          Charte du club
                        </Button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Documents sportifs</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Button variant="link" className="p-0 h-auto">
                          Calendrier des matchs
                        </Button>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Button variant="link" className="p-0 h-auto">
                          Planning des entraînements
                        </Button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Formulaires</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Button variant="link" className="p-0 h-auto">
                          Formulaire de remboursement
                        </Button>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Button variant="link" className="p-0 h-auto">
                          Autorisation parentale
                        </Button>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Button variant="link" className="p-0 h-auto">
                          Certificat médical
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres</CardTitle>
                <CardDescription>Gérez vos préférences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Notifications</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configurez les notifications que vous souhaitez recevoir.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="email-notif" className="text-sm font-medium">
                        Notifications par email
                      </label>
                      <input type="checkbox" id="email-notif" className="h-4 w-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="news-notif" className="text-sm font-medium">
                        Actualités du club
                      </label>
                      <input type="checkbox" id="news-notif" className="h-4 w-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="event-notif" className="text-sm font-medium">
                        Événements à venir
                      </label>
                      <input type="checkbox" id="event-notif" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Confidentialité</h3>
                  <p className="text-sm text-muted-foreground mb-4">Gérez vos paramètres de confidentialité.</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="profile-visibility" className="text-sm font-medium">
                        Visibilité du profil
                      </label>
                      <select id="profile-visibility" className="text-sm border rounded p-1">
                        <option value="members">Membres du club</option>
                        <option value="team">Mon équipe uniquement</option>
                        <option value="private">Privé</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Compte</h3>
                  <Button variant="destructive">Supprimer mon compte</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
