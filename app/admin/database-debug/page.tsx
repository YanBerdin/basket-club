"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { inspectProfilesTable } from "@/lib/database"
import { Loader2 } from "lucide-react"

export default function DatabaseDebugPage() {
  const [tableInfo, setTableInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const inspectTable = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await inspectProfilesTable()
      setTableInfo(result)
    } catch (err: any) {
      console.error("Error inspecting table:", err)
      setError(err.message || "An error occurred while inspecting the table")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Database Structure Debug</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profiles Table Structure</CardTitle>
            <CardDescription>Inspect the structure of the profiles table</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={inspectTable} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Inspecting...
                </>
              ) : (
                "Inspect Profiles Table"
              )}
            </Button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                <p className="font-bold">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {tableInfo && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Table Information</h3>
                <div className="p-4 bg-muted rounded-md overflow-auto">
                  <pre className="text-sm">{JSON.stringify(tableInfo, null, 2)}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
