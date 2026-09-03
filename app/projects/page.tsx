'use client';
import { Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'
export default function ProjectsPage() {

  const [data, setData] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://grpeteros-portfolio-be.onrender.com/projects')
      .then((res) => res.json())
      .then((data) => {
        let sortedData = data.projects.sort((a: any, b: any) => b.id - a.id);
        setData(sortedData)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >

      {data.projects.map((project: any, index: number) => (
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start" key={index}>
          <div>
            <Typography variant="h2" component="h1" gutterBottom>
              {project.project_title}
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
              {project.project_description}
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
              Project started on: {new Date(project.created_at).toLocaleDateString()}
            </Typography>


            <Link
              href={project.project_link}
              className="block px-4 py-2 text-sm hover:bg-slate-100 transition borderRadius: 10px"
              target="_blank"
            >
              {project.image_name.length > 0 && (
                <Image src={project.image_name} alt={project.project_title}
                  width={400} height={400}
                  className="mb-4" />
              )}
            </Link>
          </div>
        </main>
      ))}
    </div>
  );
}
