import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Créer un client Supabase pour le middleware
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Vérifier si l'utilisateur est authentifié
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    // Si une erreur se produit lors de la vérification de la session
    if (error) {
      console.error("Erreur middleware lors de la vérification de la session:", error)

      // Si l'utilisateur tente d'accéder à une route protégée
      if (req.nextUrl.pathname.startsWith("/member-area")) {
        // Rediriger vers la page de connexion avec un paramètre d'erreur
        const redirectUrl = new URL("/login", req.url)
        redirectUrl.searchParams.set("token_error", "true")
        return NextResponse.redirect(redirectUrl)
      }

      return res
    }

    // Vérifier si l'utilisateur tente d'accéder à une route protégée
    const isAccessingProtectedRoute = req.nextUrl.pathname.startsWith("/member-area")

    // Si l'utilisateur n'est pas authentifié et tente d'accéder à une route protégée
    if (!session && isAccessingProtectedRoute) {
      // Rediriger vers la page de connexion
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Si l'utilisateur est authentifié et tente d'accéder à la page de login
    if (session && req.nextUrl.pathname === "/login") {
      // Rediriger vers la page member-area
      return NextResponse.redirect(new URL("/member-area", req.url))
    }

    return res
  } catch (error) {
    console.error("Erreur middleware non gérée:", error)

    // En cas d'erreur non gérée, si l'utilisateur tente d'accéder à une route protégée
    if (req.nextUrl.pathname.startsWith("/member-area")) {
      // Rediriger vers la page de connexion avec un paramètre d'erreur
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("token_error", "true")
      return NextResponse.redirect(redirectUrl)
    }

    return res
  }
}

// Configurer les routes qui déclenchent le middleware
export const config = {
  matcher: ["/member-area/:path*", "/login"],
}
