import React from 'react';
import { Container, Section, Button, Badge, Card, Input, Select, Textarea } from '../components/ui';
import { ArrowRight, ArrowUpRight, Search, CheckCircle2, Bookmark, Sparkles, Building2, MapPin } from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  return (
    <div className="py-12 space-y-16">
      {/* Hero Header */}
      <Container>
        <div className="border-b border-[#E7E6DF] pb-8 space-y-3">
          <Badge variant="subtle" size="sm">
            Architecture &amp; Design System
          </Badge>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#183D30] font-normal tracking-tight">
            Design Tokens &amp; Component System
          </h1>
          <p className="text-[#737970] text-base max-w-2xl leading-relaxed">
            A restrained, editorial visual language calibrated for high-value real estate. Emphasizes warm ivory paper tones, forest green accents, crisp hairline borders, and sophisticated typography.
          </p>
        </div>
      </Container>

      {/* 1. Color System */}
      <Section
        kicker="Palette &amp; Tokens"
        title="Color System"
        description="A cohesive, nature-inspired palette avoiding neon accents, harsh blacks, or excessive gradients."
        spacing="sm"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Warm Ivory', hex: '#F7F6F2', role: 'Canvas Background', textDark: true },
            { name: 'Pure Surface', hex: '#FFFFFF', role: 'Card & Surface', textDark: true, border: true },
            { name: 'Forest Green', hex: '#183D30', role: 'Primary Brand Action', textDark: false },
            { name: 'Secondary Green', hex: '#315B49', role: 'Secondary Accents', textDark: false },
            { name: 'Muted Sage', hex: '#A7B9A5', role: 'Subtle Accents', textDark: true },
            { name: 'Dark Charcoal', hex: '#202520', role: 'Primary Typography', textDark: false },
            { name: 'Muted Slate', hex: '#737970', role: 'Secondary Typography', textDark: false },
            { name: 'Hairline Border', hex: '#E7E6DF', role: 'Architectural Line', textDark: true, border: true },
          ].map((c) => (
            <div
              key={c.name}
              className={`p-4 border ${c.border ? 'border-[#E7E6DF]' : 'border-transparent'} space-y-3`}
              style={{ backgroundColor: c.hex }}
            >
              <div
                className={`text-xs font-mono font-bold ${
                  c.textDark ? 'text-[#202520]' : 'text-[#F7F6F2]'
                }`}
              >
                {c.hex}
              </div>
              <div>
                <div
                  className={`font-serif text-base font-medium ${
                    c.textDark ? 'text-[#202520]' : 'text-white'
                  }`}
                >
                  {c.name}
                </div>
                <div
                  className={`text-[11px] font-sans ${
                    c.textDark ? 'text-[#737970]' : 'text-[#A7B9A5]'
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
          <div className="space-y-1 pb-6 border-b border-[#E7E6DF]">
            <span className="text-[11px] font-mono text-[#737970] uppercase">Display / Hero (48px - 72px)</span>
            <div className="font-serif text-5xl sm:text-6xl text-[#183D30]">
              Spaces. Places. Possibilities.
            </div>
          </div>

          <div className="space-y-1 pb-6 border-b border-[#E7E6DF]">
            <span className="text-[11px] font-mono text-[#737970] uppercase">Heading 1 / Section Title (32px - 40px)</span>
            <div className="font-serif text-3xl sm:text-4xl text-[#183D30]">
              The Courtyard Villa at Sadashivanagar
            </div>
          </div>

          <div className="space-y-1 pb-6 border-b border-[#E7E6DF]">
            <span className="text-[11px] font-mono text-[#737970] uppercase">Heading 2 / Card Title (20px - 24px)</span>
            <div className="font-serif text-2xl text-[#202520]">
              Minimalist Tropical Pavilion with Rain-Court
            </div>
          </div>

          <div className="space-y-1 pb-6 border-b border-[#E7E6DF]">
            <span className="text-[11px] font-mono text-[#737970] uppercase">Body Large &amp; Regular (14px - 16px)</span>
            <p className="text-[#202520] text-base leading-relaxed max-w-3xl">
              An architectural residence designed with reclaimed teak and double-height living spaces. Floor-to-ceiling glass pavilions open directly into private landscaped gardens, bringing the natural canopy of Sadashivanagar indoors.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#737970] uppercase">Metadata / Architectural Specs (11px Monospace)</span>
            <div className="font-mono text-xs text-[#737970] uppercase tracking-widest">
              6,200 SQ.FT &bull; 4 BHK &bull; EAST FACING &bull; PRIVATE LAP POOL &bull; ₹18.5 CR
            </div>
          </div>
        </Card>
      </Section>

      {/* 3. Button System */}
      <Section
        kicker="Actions &amp; Micro-interactions"
        title="Button Hierarchy"
        description="Crisp 1px borders, subtle radius, high contrast feedback without excessive shadows."
        spacing="sm"
      >
        <Card padding="lg" className="space-y-8">
          {/* Variants */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-[#737970] block">Button Variants</span>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Primary Action
              </Button>
              <Button variant="secondary" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Secondary Green
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
          <div className="space-y-3 pt-6 border-t border-[#E7E6DF]">
            <span className="text-xs font-mono uppercase text-[#737970] block">Sizes &amp; States</span>
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
        description="Sharp, minimal surfaces that allow high-resolution architectural photography to lead."
        spacing="sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card variant="default" padding="md" className="space-y-3">
            <Badge variant="outline">Default Card</Badge>
            <h3 className="font-serif text-xl text-[#183D30]">White Surface</h3>
            <p className="text-xs text-[#737970] leading-relaxed">
              Standard content card with 1px border (#E7E6DF), crisp corners, and no distracting drop shadow.
            </p>
          </Card>

          <Card variant="surface" padding="md" className="space-y-3">
            <Badge variant="outline">Surface Card</Badge>
            <h3 className="font-serif text-xl text-[#183D30]">Ivory Canvas</h3>
            <p className="text-xs text-[#737970] leading-relaxed">
              Subtle tinted background (#F7F6F2) for contrast against white page elements or alternating sections.
            </p>
          </Card>

          <Card variant="interactive" padding="md" className="space-y-3">
            <Badge variant="subtle">Interactive Card</Badge>
            <h3 className="font-serif text-xl text-[#183D30]">Hover Reactive</h3>
            <p className="text-xs text-[#737970] leading-relaxed">
              Border shifts to #183D30 on cursor hover with a delicate 2px vertical elevation.
            </p>
          </Card>
        </div>
      </Section>
    </div>
  );
};
