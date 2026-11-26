import React from 'react';
import { Container, Section, Button, Badge, Card, Input, Select, Textarea } from '../../../components/ui';
import { ArrowRight, ArrowUpRight, Search, CheckCircle2, Bookmark, Sparkles, Building2, MapPin } from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  return (
    <div className="py-12 space-y-16">
      {/* Hero Header */}
      <Container>
        <div className="border-b border-[#D9E0E6] pb-8 space-y-3">
          <Badge variant="subtle" size="sm">
            Architecture &amp; Design System
          </Badge>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#183653] font-normal tracking-tight">
            Design Tokens &amp; Component System
          </h1>
          <p className="text-[#354B60] text-base max-w-2xl leading-relaxed">
            A restrained, editorial visual language calibrated for high-value real estate. Warm ivory, architectural navy, muted-blue accents, translucent surfaces, and measured typography carry through the marketplace and its account portals.
          </p>
        </div>
      </Container>

      {/* 1. Color System */}
      <Section
        kicker="Palette &amp; Tokens"
        title="Color System"
        description="A cohesive navy-blue and neutral palette using pale blue, warm off-white, and crisp borders."
        spacing="sm"
      >
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Warm Off-White', hex: '#F8F7F3', role: 'Main Page Background', textDark: true },
            { name: 'White', hex: '#FFFFFF', role: 'Card Backgrounds', textDark: true, border: true },
            { name: 'Deep Navy', hex: '#183653', role: 'Primary Buttons & Elements', textDark: false },
            { name: 'Dark Navy', hex: '#102B46', role: 'Headings & Strong Text', textDark: false },
            { name: 'Slate Blue', hex: '#315D82', role: 'Secondary Elements', textDark: false },
            { name: 'Muted Blue', hex: '#7896B2', role: 'Subtle Accents', textDark: true },
            { name: 'Pale Blue', hex: '#DCE7F0', role: 'Soft Backgrounds', textDark: true },
            { name: 'Light Blue Grey', hex: '#EDF2F6', role: 'Cards & Sections', textDark: true },
            { name: 'Body Text', hex: '#354B60', role: 'Paragraphs & Descriptions', textDark: false },
            { name: 'Muted Text', hex: '#8493A1', role: 'Secondary Text', textDark: true },
            { name: 'Borders', hex: '#D9E0E6', role: 'Borders & Dividers', textDark: true, border: true },
            { name: 'Glass Surface', hex: 'rgba(255,255,255,0.78)', role: 'Navigation & Filter Layers', textDark: true, border: true },
          ].map((c) => (
            <div
              key={c.name}
              className={`min-w-0 p-4 border ${c.border ? 'border-[#D9E0E6]' : 'border-transparent'} space-y-3`}
              style={{ backgroundColor: c.hex }}
            >
              <div
                className={`break-all text-xs font-mono font-bold ${
                  c.textDark ? 'text-[#102B46]' : 'text-[#F8F7F3]'
                }`}
              >
                {c.hex}
              </div>
              <div>
                <div
                  className={`font-serif text-base font-medium ${
                    c.textDark ? 'text-[#102B46]' : 'text-white'
                  }`}
                >
                  {c.name}
                </div>
                <div
                  className={`text-[11px] font-sans ${
                    c.textDark ? 'text-[#102B46]' : 'text-[#DCE7F0]'
                  }`}
                >
                  {c.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 2. Typography System */}
      <Section
        kicker="Type Hierarchy"
        title="Editorial Typography"
        description="DM Serif Display for dignified architectural headings paired with Manrope for crisp, legible body prose."
        spacing="sm"
      >
        <Card padding="lg" className="space-y-8">
          <div className="space-y-1 pb-6 border-b border-[#D9E0E6]">
            <span className="text-[11px] font-mono text-[#354B60] uppercase">Display / Hero (48px - 72px)</span>
            <div className="break-words font-serif text-3xl leading-tight text-[#183653] sm:text-5xl md:text-6xl">
              Spaces. Places. Possibilities.
            </div>
          </div>

          <div className="space-y-1 pb-6 border-b border-[#D9E0E6]">
            <span className="text-[11px] font-mono text-[#354B60] uppercase">Heading 1 / Section Title (32px - 40px)</span>
            <div className="font-serif text-3xl sm:text-4xl text-[#183653]">
              The Courtyard Villa at Sadashivanagar
            </div>
          </div>

          <div className="space-y-1 pb-6 border-b border-[#D9E0E6]">
            <span className="text-[11px] font-mono text-[#354B60] uppercase">Heading 2 / Card Title (20px - 24px)</span>
            <div className="font-serif text-2xl text-[#102B46]">
              Minimalist Tropical Pavilion with Rain-Court
            </div>
          </div>

          <div className="space-y-1 pb-6 border-b border-[#D9E0E6]">
            <span className="text-[11px] font-mono text-[#354B60] uppercase">Body Large &amp; Regular (14px - 16px)</span>
            <p className="text-[#102B46] text-base leading-relaxed max-w-3xl">
              An architectural residence designed with reclaimed teak and double-height living spaces. Floor-to-ceiling glass pavilions open directly into private landscaped gardens, bringing the natural canopy of Sadashivanagar indoors.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#354B60] uppercase">Metadata / Architectural Specs (11px Monospace)</span>
            <div className="font-mono text-xs text-[#354B60] uppercase tracking-widest">
              6,200 SQ.FT &bull; 4 BHK &bull; EAST FACING &bull; PRIVATE LAP POOL &bull; ₹18.5 CR
            </div>
          </div>
        </Card>
      </Section>

      {/* 3. Button System */}
      <Section
        kicker="Actions &amp; Micro-interactions"
        title="Button Hierarchy"
        description="Consistent pill-shaped actions, quiet borders, clear focus states, and restrained elevation."
        spacing="sm"
      >
        <Card padding="lg" className="space-y-8">
          {/* Variants */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-[#354B60] block">Button Variants</span>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Primary Action
              </Button>
              <Button variant="secondary" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Secondary Action
              </Button>
              <Button variant="outline" leftIcon={<Bookmark className="w-4 h-4" />}>
                Outline Action
              </Button>
              <Button variant="ghost">
                Ghost Action
              </Button>
              <Button variant="editorial">
                Editorial Text Link &rarr;
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3 pt-6 border-t border-[#D9E0E6]">
            <span className="text-xs font-mono uppercase text-[#354B60] block">Sizes &amp; States</span>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small (sm)</Button>
              <Button size="md">Medium (md)</Button>
              <Button size="lg">Large (lg)</Button>
              <Button isLoading size="md">Loading State</Button>
              <Button disabled size="md">Disabled State</Button>
            </div>
          </div>
        </Card>
      </Section>

      {/* 4. Badges & Chips */}
      <Section
        kicker="Micro-labels"
        title="Badges &amp; Tags"
        description="Clean indicators for property typologies, verification, and listing states."
        spacing="sm"
      >
        <Card padding="md" className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Featured Listing</Badge>
          <Badge variant="verified">Verified Seller</Badge>
          <Badge variant="category">Villa &amp; Estate</Badge>
          <Badge variant="category">Apartment</Badge>
          <Badge variant="category">Agricultural Land</Badge>
          <Badge variant="subtle">Under Moderation</Badge>
          <Badge variant="outline">Sadashivanagar</Badge>
          <Badge variant="outline">5 BHK</Badge>
        </Card>
      </Section>

      {/* 5. Architectural Forms */}
      <Section
        kicker="Input Controls"
        title="Form Elements"
        description="Hairline borders, uppercase mono labels, elegant placeholder tones."
        spacing="sm"
      >
        <Card padding="lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Input
              label="Location or Neighborhood"
              placeholder="e.g. Indiranagar, Whitefield"
              leftIcon={<Search className="w-4 h-4" />}
            />
            <Select
              label="Property Typology"
              options={[
                { label: 'All Typologies', value: 'all' },
                { label: 'Villas & Private Estates', value: 'villa' },
                { label: 'Penthouses & Lofts', value: 'apartment' },
                { label: 'Land & Plots', value: 'land' },
              ]}
            />
            <Input
              label="Asking Price (INR)"
              placeholder="₹18,50,00,000"
              helperText="Formatted automatically in Crores and Lakhs"
            />
            <div className="sm:col-span-3">
              <Textarea
                label="Architectural Description"
                placeholder="Highlight material finishes, thermal orientation, natural ventilation, and spatial layout..."
                rows={3}
              />
            </div>
          </div>
        </Card>
      </Section>

      {/* 6. Architectural Card Surfaces */}
      <Section
        kicker="Structural Containers"
        title="Card &amp; Surface System"
        description="Warm, structured surfaces with consistent corner radii, quiet elevation, and restrained glass layers."
        spacing="sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <Card variant="default" padding="md" className="space-y-3">
            <Badge variant="outline">Default Card</Badge>
            <h3 className="font-serif text-xl text-[#183653]">White Surface</h3>
            <p className="text-xs text-[#354B60] leading-relaxed">
              A rounded white surface with a hairline neutral border and soft architectural shadow.
            </p>
          </Card>

          <Card variant="surface" padding="md" className="space-y-3">
            <Badge variant="outline">Surface Card</Badge>
            <h3 className="font-serif text-xl text-[#183653]">Warm Off-White Canvas</h3>
            <p className="text-xs text-[#354B60] leading-relaxed">
              Subtle tinted background (#F8F7F3) for contrast against white page elements or alternating sections.
            </p>
          </Card>

          <Card variant="interactive" padding="md" className="space-y-3">
            <Badge variant="subtle">Interactive Card</Badge>
            <h3 className="font-serif text-xl text-[#183653]">Hover Reactive</h3>
            <p className="text-xs text-[#354B60] leading-relaxed">
              A restrained two-pixel lift and softer shadow provide a clear, quiet hover state.
            </p>
          </Card>

          <Card variant="glass" padding="md" className="space-y-3">
            <Badge variant="outline">Glass Surface</Badge>
            <h3 className="font-serif text-xl text-[#183653]">Layered, Not Lost</h3>
            <p className="text-xs text-[#354B60] leading-relaxed">
              Translucent white with a gentle blur adds depth while keeping interface text legible.
            </p>
          </Card>
        </div>
      </Section>
    </div>
  );
};
