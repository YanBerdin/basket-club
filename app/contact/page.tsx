"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Simulation d'envoi de formulaire
    setTimeout(() => {
      setFormSubmitted(true)
      toast({
        title: "Formulaire envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      })
    }, 1000)
  }

  const handleRegistrationSubmit = (e) => {
    e.preventDefault()
    // Simulation d'envoi de formulaire
    setTimeout(() => {
      toast({
        title: "Demande d'inscription envoyée",
        description: "Nous vous contacterons pour finaliser votre inscription.",
      })
    }, 1000)
  }

  return (
    <main className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact & Adhésion</h1>

        <Tabs defaultValue="contact" className="mb-16">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="registration">Adhésion</TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Nous contacter</h2>
                <p className="mb-6">
                  Vous avez une question, une suggestion ou une demande ? N&apos;hésitez pas à nous contacter via le
                  formulaire ci-dessous ou en utilisant nos coordonnées.
                </p>

                {formSubmitted ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                        <h3 className="text-xl font-bold">Message envoyé !</h3>
                        <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
                        <Button onClick={() => setFormSubmitted(false)}>Envoyer un autre message</Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Select defaultValue="general">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Renseignement général</SelectItem>
                          <SelectItem value="registration">Inscription</SelectItem>
                          <SelectItem value="partnership">Partenariat</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" rows={5} required />
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="privacy" className="mt-1" required />
                      <Label htmlFor="privacy" className="text-sm">
                        J&apos;accepte que mes données soient traitées conformément à la{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          politique de confidentialité
                        </Link>
                        .
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Envoyer
                    </Button>
                  </form>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Nos coordonnées</h2>
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-primary" /> Adresse
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <address className="not-italic">
                        <p>Gymnase du Réveil</p>
                        <p>Rue du Stade</p>
                        <p>21120 Is-sur-Tille</p>
                      </address>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Phone className="mr-2 h-5 w-5 text-primary" /> Téléphone
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <a href="tel:+33380000000" className="hover:underline">
                          03 80 00 00 00
                        </a>
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Mail className="mr-2 h-5 w-5 text-primary" /> Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <a href="mailto:contact@reveilbasket.fr" className="hover:underline">
                          contact@reveilbasket.fr
                        </a>
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Horaires du secrétariat</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        <li className="flex justify-between">
                          <span>Lundi</span>
                          <span>17h - 19h</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Mercredi</span>
                          <span>14h - 19h</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Vendredi</span>
                          <span>17h - 19h</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 bg-muted p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Plan d&apos;accès</h3>
                  <div className="aspect-video bg-accent rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Carte interactive (à intégrer)</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="registration">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Rejoindre le club</h2>
                <p className="mb-6">
                  Vous souhaitez rejoindre le Réveil Basket Is sur Tille ? Remplissez le formulaire de pré-inscription
                  ci-dessous et nous vous contacterons pour finaliser votre adhésion.
                </p>

                <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="regFirstName">Prénom</Label>
                      <Input id="regFirstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regLastName">Nom</Label>
                      <Input id="regLastName" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Date de naissance</Label>
                    <Input id="birthdate" type="date" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Genre</Label>
                    <RadioGroup defaultValue="male" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Masculin</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Féminin</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="regEmail">Email</Label>
                      <Input id="regEmail" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea id="address" rows={3} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie souhaitée</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="u7">U7 (Baby Basket)</SelectItem>
                        <SelectItem value="u9">U9 (Mini-Poussins/Mini-Poussines)</SelectItem>
                        <SelectItem value="u11">U11 (Poussins/Poussines)</SelectItem>
                        <SelectItem value="u13">U13 (Benjamins/Benjamines)</SelectItem>
                        <SelectItem value="u15">U15 (Minimes)</SelectItem>
                        <SelectItem value="u17">U17 (Cadets/Cadettes)</SelectItem>
                        <SelectItem value="u20">U20 (Juniors)</SelectItem>
                        <SelectItem value="seniors">Seniors</SelectItem>
                        <SelectItem value="loisir">Loisir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Expérience en basket</Label>
                    <Select defaultValue="beginner">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Débutant</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire</SelectItem>
                        <SelectItem value="advanced">Avancé</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Commentaires</Label>
                    <Textarea id="comments" rows={3} placeholder="Informations complémentaires, questions..." />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="regPrivacy" className="mt-1" required />
                    <Label htmlFor="regPrivacy" className="text-sm">
                      J&apos;accepte que mes données soient traitées conformément à la{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        politique de confidentialité
                      </Link>
                      .
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">
                    Envoyer ma demande d&apos;inscription
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Informations sur l&apos;adhésion</h2>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Tarifs 2025-2026</CardTitle>
                    <CardDescription>Les tarifs incluent la licence FFBB et l&apos;assurance.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>U7 (Baby Basket)</span>
                        <span className="font-bold">80 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>U9 (Mini-Poussins/Mini-Poussines)</span>
                        <span className="font-bold">90 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>U11 (Poussins/Poussines)</span>
                        <span className="font-bold">100 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>U13 (Benjamins/Benjamines)</span>
                        <span className="font-bold">110 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>U15 (Minimes)</span>
                        <span className="font-bold">120 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>U17 (Cadets/Cadettes)</span>
                        <span className="font-bold">130 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>U20 (Juniors)</span>
                        <span className="font-bold">140 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Seniors</span>
                        <span className="font-bold">150 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loisir</span>
                        <span className="font-bold">100 €</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Documents à fournir</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Formulaire d&apos;inscription complété et signé</li>
                      <li>
                        Certificat médical de non contre-indication à la pratique du basket-ball en compétition (ou
                        questionnaire de santé pour les renouvellements)
                      </li>
                      <li>Photo d&apos;identité récente</li>
                      <li>Copie d&apos;une pièce d&apos;identité</li>
                      <li>Règlement de la cotisation (chèque, espèces ou virement)</li>
                      <li>Autorisation parentale pour les mineurs</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Réductions et aides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">Plusieurs réductions sont possibles :</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                      <li>Réduction famille : -10€ à partir du 2ème membre</li>
                      <li>Possibilité de paiement en plusieurs fois</li>
                      <li>Acceptation des chèques vacances et coupons sport</li>
                    </ul>
                    <p>
                      Le club est partenaire du dispositif Pass&apos;Sport et accepte les aides des comités
                      d&apos;entreprise.
                    </p>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/documents/inscription.pdf" target="_blank">
                      Télécharger le dossier d&apos;inscription
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
