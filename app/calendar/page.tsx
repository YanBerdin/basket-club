"use client"

import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "moment/locale/fr"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, CalendarIcon, Clock } from "lucide-react"
import { getEvents } from "@/lib/database"
import type { Event } from "@/types/database.types"

// Configuration du localisateur pour le français
moment.locale("fr")
const localizer = momentLocalizer(moment)

// Fonction pour formater les événements pour le calendrier
const formatEvents = (events: Event[]) => {
  return events.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start_time),
    end: new Date(event.end_time),
    allDay: false,
    resource: event,
  }))
}

// Composants pour les différentes vues
const EventAgendaItem = ({ event }) => {
  const { resource } = event
  return (
    <div className="p-2 hover:bg-muted rounded-md transition-colors">
      <div className="font-medium">{event.title}</div>
      <div className="text-sm text-muted-foreground flex items-center mt-1">
        <MapPin className="h-3 w-3 mr-1" /> {resource.location}
      </div>
      <div className="text-sm text-muted-foreground flex items-center">
        <Clock className="h-3 w-3 mr-1" /> {moment(event.start).format("HH:mm")} - {moment(event.end).format("HH:mm")}
      </div>
    </div>
  )
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [view, setView] = useState("month")
  const [date, setDate] = useState(new Date())
  const [category, setCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const eventsData = await getEvents()
        setEvents(eventsData)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Filtrer les événements par catégorie si nécessaire
  const filteredEvents = category === "all" ? events : events.filter((event) => event.category === category)

  // Formater les événements pour le calendrier
  const calendarEvents = formatEvents(filteredEvents)

  // Catégories d'événements (à remplacer par des données réelles)
  const categories = [
    { value: "all", label: "Tous les événements" },
    { value: "match", label: "Matchs" },
    { value: "training", label: "Entraînements" },
    { value: "tournament", label: "Tournois" },
    { value: "meeting", label: "Réunions" },
    { value: "other", label: "Autres" },
  ]

  // Événements à venir (prochains 5 événements)
  const upcomingEvents = filteredEvents
    .filter((event) => new Date(event.start_time) >= new Date())
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
    .slice(0, 5)

  return (
    <main className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Calendrier des événements</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Calendrier</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={view} onValueChange={setView}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Vue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Mois</SelectItem>
                        <SelectItem value="week">Semaine</SelectItem>
                        <SelectItem value="day">Jour</SelectItem>
                        <SelectItem value="agenda">Agenda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[600px] flex items-center justify-center">
                    <p>Chargement du calendrier...</p>
                  </div>
                ) : (
                  <div className="h-[600px]">
                    <Calendar
                      localizer={localizer}
                      events={calendarEvents}
                      startAccessor="start"
                      endAccessor="end"
                      view={view}
                      onView={setView}
                      date={date}
                      onNavigate={setDate}
                      style={{ height: "100%" }}
                      messages={{
                        next: "Suivant",
                        previous: "Précédent",
                        today: "Aujourd'hui",
                        month: "Mois",
                        week: "Semaine",
                        day: "Jour",
                        agenda: "Agenda",
                        date: "Date",
                        time: "Heure",
                        event: "Événement",
                        allDay: "Toute la journée",
                        noEventsInRange: "Aucun événement dans cette période",
                      }}
                      components={{
                        agenda: {
                          event: EventAgendaItem,
                        },
                      }}
                      popup
                      tooltipAccessor={(event) => event.resource.description}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
                <CardDescription>Les prochains événements du club</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Chargement des événements...</p>
                ) : upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {moment(event.start_time).format("DD MMMM YYYY")}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {moment(event.start_time).format("HH:mm")} - {moment(event.end_time).format("HH:mm")}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {event.location}
                        </div>
                        <p className="text-sm mt-2">{event.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Aucun événement à venir</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exporter le calendrier</CardTitle>
                <CardDescription>Synchronisez les événements avec votre agenda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Vous pouvez exporter notre calendrier d&apos;événements pour le synchroniser avec votre agenda
                  personnel.
                </p>
                <div className="space-y-2">
                  <Button className="w-full">
                    <CalendarIcon className="mr-2 h-4 w-4" /> Google Calendar
                  </Button>
                  <Button variant="outline" className="w-full">
                    <CalendarIcon className="mr-2 h-4 w-4" /> iCalendar (.ics)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="matches">Matchs</TabsTrigger>
            <TabsTrigger value="tournaments">Tournois</TabsTrigger>
            <TabsTrigger value="club">Événements du club</TabsTrigger>
          </TabsList>

          {["all", "matches", "tournaments", "club"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue}>
              <div className="bg-muted p-6 rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left">Événement</th>
                        <th className="py-3 px-4 text-left">Lieu</th>
                        <th className="py-3 px-4 text-left">Heure</th>
                        <th className="py-3 px-4 text-left">Catégorie</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="py-4 text-center">
                            Chargement des événements...
                          </td>
                        </tr>
                      ) : filteredEvents.length > 0 ? (
                        filteredEvents
                          .filter((event) => {
                            if (tabValue === "all") return true
                            if (tabValue === "matches") return event.category === "match"
                            if (tabValue === "tournaments") return event.category === "tournament"
                            if (tabValue === "club") return ["meeting", "other"].includes(event.category)
                            return true
                          })
                          .map((event) => (
                            <tr key={event.id} className="border-b hover:bg-background/50 transition-colors">
                              <td className="py-3 px-4">{moment(event.start_time).format("DD/MM/YYYY")}</td>
                              <td className="py-3 px-4 font-medium">{event.title}</td>
                              <td className="py-3 px-4">{event.location}</td>
                              <td className="py-3 px-4">{moment(event.start_time).format("HH:mm")}</td>
                              <td className="py-3 px-4">
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                  {event.category === "match"
                                    ? "Match"
                                    : event.category === "training"
                                      ? "Entraînement"
                                      : event.category === "tournament"
                                        ? "Tournoi"
                                        : event.category === "meeting"
                                          ? "Réunion"
                                          : "Autre"}
                                </span>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-4 text-center">
                            Aucun événement trouvé
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  )
}
