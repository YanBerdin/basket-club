"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { signIn, resetPassword } from "@/lib/auth"
import { useAuth } from "@/components/auth-provider"
import { isRefreshTokenError } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading, refreshUser, clearSession } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Utiliser useRef pour suivre si une redirection a déjà été tentée
  const redirectAttempted = useRef(false)
  // Utiliser useRef pour suivre si le composant est monté
  const isMounted = useRef(true)

  // Réinitialiser le statut de montage
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  // Vérifier si l'utilisateur a été redirigé en raison d'une erreur de token
  useEffect(() => {
    const tokenError = searchParams?.get("token_error")
    if (tokenError === "true") {
      toast({
        title: "Session expirée",
        description: "Votre session a expiré. Veuillez vous reconnecter.",
        variant: "destructive",
      })
      clearSession()
    }
  }, [searchParams, clearSession])

  // Rediriger si l'utilisateur est déjà connecté
  useEffect(() => {
    // Ne pas tenter de redirection si le chargement est en cours
    if (loading) return

    // Si l'utilisateur est connecté et que nous n'avons pas encore tenté de rediriger
    if (user && !redirectAttempted.current) {
      console.log("Utilisateur connecté, redirection vers member-area")
      redirectAttempted.current = true

      // Utiliser setTimeout pour s'assurer que la redirection se produit après le rendu
      setTimeout(() => {
        if (isMounted.current) {
          router.replace("/member-area")
        }
      }, 100)
    }
  }, [user, loading, router])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(email, password)

      // Rafraîchir l'état de l'utilisateur
      await refreshUser()

      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans votre espace membre.",
      })

      // Redirection explicite
      redirectAttempted.current = true
      router.replace("/member-area")
    } catch (error) {
      console.error("Erreur de connexion:", error)

      // Message d'erreur spécifique pour les erreurs de token
      if (isRefreshTokenError(error)) {
        toast({
          title: "Erreur de session",
          description: "Un problème est survenu avec votre session. Veuillez réessayer.",
          variant: "destructive",
        })
        clearSession()
      } else {
        toast({
          title: "Erreur de connexion",
          description: error.message || "Vérifiez vos identifiants et réessayez.",
          variant: "destructive",
        })
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false)
      }
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await resetPassword(email)
      toast({
        title: "Email envoyé",
        description: "Consultez votre boîte mail pour réinitialiser votre mot de passe.",
      })
      setForgotPassword(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'envoyer l'email de réinitialisation.",
        variant: "destructive",
      })
    } finally {
      if (isMounted.current) {
        setIsLoading(false)
      }
    }
  }

  // Si l'utilisateur est déjà connecté et qu'une redirection est en cours, afficher un message de chargement
  if (user && !loading) {
    return (
      <main className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Redirection...</h1>
          <p className="text-center">Vous êtes déjà connecté. Redirection vers votre espace membre.</p>
          <div className="mt-4 text-center">
            <Button onClick={() => router.replace("/member-area")} className="mx-auto">
              Cliquez ici si vous n'êtes pas redirigé automatiquement
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Espace Membres</h1>

        {forgotPassword ? (
          <Card>
            <CardHeader>
              <CardTitle>Mot de passe oublié</CardTitle>
              <CardDescription>Entrez votre adresse email pour recevoir un lien de réinitialisation.</CardDescription>
            </CardHeader>
            <form onSubmit={handleForgotPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
                </Button>
                <Button type="button" variant="link" onClick={() => setForgotPassword(false)} className="w-full">
                  Retour à la connexion
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Connexion</CardTitle>
              <CardDescription>Connectez-vous pour accéder à votre espace membre.</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-sm"
                      onClick={() => setForgotPassword(true)}
                    >
                      Mot de passe oublié ?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Pas encore membre ?{" "}
                  <Link href="/contact?tab=registration" className="text-primary hover:underline">
                    S&apos;inscrire
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </main>
  )
}
