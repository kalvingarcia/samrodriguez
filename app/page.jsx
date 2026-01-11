import About from '@/source/content/about';
import Projects from '@/source/content/projects';
import Contact from '@/source/content/contact';

export default function Homepage() {
    return (
        <main>
            <Projects />
            <About />
            <Contact />
        </main>
    );
}