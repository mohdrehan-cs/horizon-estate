"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ImagePlus,
  IndianRupee,
  Loader2,
  MapPin,
  Plus,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { cities, getCity } from "@/data/cities";
import { AMENITY } from "@/data/properties";
import { gallery } from "@/data/images";
import { formatINR, formatINRFull } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/providers/ToastProvider";

const steps = [
  { number: 1, label: "Property basics", note: "Type, location and size" },
  { number: 2, label: "Pricing & status", note: "Expectation and possession" },
  { number: 3, label: "Presentation", note: "Photos and description" },
  { number: 4, label: "Contact & publish", note: "Who should buyers call?" },
];

const amenityList = [
  AMENITY.parking,
  AMENITY.power,
  AMENITY.lift,
  AMENITY.security,
  AMENITY.pool,
  AMENITY.gym,
  AMENITY.club,
  AMENITY.garden,
  AMENITY.kids,
  AMENITY.cctv,
  AMENITY.ev,
  AMENITY.retail,
];

const demoPhotos = [...gallery.luxuryHome.slice(0, 3), ...gallery.cityApartment.slice(0, 2)];

export function ListPropertyWizard() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [published, setPublished] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<string[]>(demoPhotos.slice(0, 3));

  const [form, setForm] = useState({
    listingType: "sale",
    type: "Apartment",
    city: "noida",
    locality: "sector-150",
    address: "",
    bhk: "3",
    bathrooms: "3",
    area: "1750",
    floor: "6",
    totalFloors: "18",
    price: "20500000",
    maintenance: "5500",
    deposit: "",
    possession: "Ready to move",
    age: "5",
    furnishing: "Semi-furnished",
    facing: "East",
    ownership: "Freehold",
    authority: "Noida Authority",
    rera: "",
    title: "",
    description: "",
    amenities: [AMENITY.parking, AMENITY.power, AMENITY.lift, AMENITY.security] as string[],
    name: "",
    phone: "",
    email: "",
    plan: "Signature",
    consent: false,
  });

  const city = getCity(form.city) ?? cities[0];
  const locality = city.localities.find((item) => item.slug === form.locality) ?? city.localities[0];

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function onCityChange(value: string) {
    const next = getCity(value);
    setForm((current) => ({ ...current, city: value, locality: next?.localities[0]?.slug ?? "" }));
  }

  const preview = useMemo(
    () => ({
      price: Number(form.price) || 0,
      area: Number(form.area) || 0,
      psf: Number(form.area) ? Math.round((Number(form.price) || 0) / Number(form.area)) : 0,
      localityName: locality?.name ?? "",
      cityName: city?.name ?? "",
      title: form.title || `${form.bhk} BHK ${form.type} in ${locality?.name ?? city?.name}`,
    }),
    [form.price, form.area, form.title, form.bhk, form.type, locality?.name, city?.name],
  );

  function validate(current: number) {
    const next: Record<string, string> = {};
    if (current === 1) {
      if (!form.address.trim()) next.address = "Please add a building or street address.";
      if (!Number(form.area) || Number(form.area) < 100) next.area = "Enter a valid built-up area.";
      if (!form.locality) next.locality = "Select a locality.";
    }
    if (current === 2) {
      if (!Number(form.price)) next.price = "Enter your expected price.";
    }
    if (current === 3) {
      if (form.title.trim().length < 10) next.title = "Add a descriptive title (at least 10 characters).";
      if (form.description.trim().length < 40) next.description = "Add at least a couple of sentences about the home.";
      if (!photos.length) next.photos = "Add at least one photo, or use the demo photos.";
    }
    if (current === 4) {
      if (form.name.trim().length < 2) next.name = "Please enter your name.";
      if (!/^[+\d][\d\s-]{8,15}$/.test(form.phone)) next.phone = "Enter a valid phone number.";
      if (!form.consent) next.consent = "Please confirm you have the right to list this property.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function next() {
    if (!validate(step)) {
      toast("Please complete the highlighted fields.", "error");
      return;
    }
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  }

  function back() {
    setStep((current) => Math.max(1, current - 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate(4)) {
      toast("Please complete the highlighted fields.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setPublished(true);
      toast("Draft published. In the live product, this listing would enter verification.");
      window.scrollTo({ top: 120, behavior: "smooth" });
    }, 1400);
  }

  function addPhotos(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    setPhotos((current) => [...current, ...demoPhotos.slice(0, files.length)].slice(0, 6));
    toast(`${files.length} photo${files.length > 1 ? "s" : ""} added (demo preview uses sample images).`);
  }

  if (published) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-6 text-center sm:p-10">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#eef5ec] text-[#2f5a3c]">
          <CheckCircle2 className="size-8" />
        </div>
        <p className="eyebrow mt-5 text-brass">Draft published · demo</p>
        <h2 className="mt-2 text-[clamp(1.7rem,3.5vw,2.4rem)] text-forest">Your property is in review.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          In the live product, our team would verify ownership, photographs and pricing before publishing. You would
          receive a WhatsApp confirmation and a link to your seller dashboard.
        </p>
        <div className="mt-6 rounded-2xl border border-line bg-cream p-4 text-left">
          <div className="flex items-start gap-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
              <Image src={photos[0]} alt="Listing preview" fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-bold text-forest">{preview.title}</p>
              <p className="text-[10px] text-muted">
                {preview.localityName}, {preview.cityName}
              </p>
              <p className="mt-1 text-[12px] font-bold text-brass">
                {form.listingType === "rent" ? `${formatINRFull(Number(form.price))}/mo` : formatINR(preview.price)}
              </p>
            </div>
            <Badge variant="brass" className="ml-auto shrink-0">
              In review
            </Badge>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <ButtonLink href="/dashboard/seller" iconRight={ArrowRight}>
            Open seller dashboard
          </ButtonLink>
          <Button
            variant="outline"
            onClick={() => {
              setPublished(false);
              setStep(1);
            }}
          >
            List another property
          </Button>
        </div>
        <p className="mt-4 text-[9px] text-muted">This is a demonstration. No listing has been created.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
      <aside className="rounded-3xl border border-line bg-white p-5 lg:sticky lg:top-24">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass">List a property</p>
        <div className="mt-4 space-y-1">
          {steps.map((item) => {
            const active = item.number === step;
            const complete = item.number < step;
            return (
              <button
                key={item.number}
                onClick={() => {
                  if (item.number < step) setStep(item.number);
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl px-2.5 py-2.5 text-left transition",
                  active ? "bg-sand" : complete ? "hover:bg-sand/50" : "opacity-50",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border text-[10px] font-bold",
                    active
                      ? "border-forest bg-forest text-cream"
                      : complete
                        ? "border-[#c6dbc2] bg-[#eef5ec] text-[#2f5a3c]"
                        : "border-line bg-white text-muted",
                  )}
                >
                  {complete ? <Check className="size-3.5" /> : item.number}
                </span>
                <span>
                  <span className={cn("block text-[11px] font-bold", active ? "text-forest" : "text-forest/80")}>
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[9px] text-muted">{item.note}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-xl bg-sand/60 p-3.5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-forest">No listing fee</p>
          <p className="mt-1 text-[9px] leading-relaxed text-muted">
            Publishing is free on the Explorer plan. Paid plans add featured placement and a lead dashboard.
          </p>
          <Link href="/pricing" className="mt-1.5 inline-block text-[9px] font-bold text-brass">
            Compare plans →
          </Link>
        </div>
      </aside>

      <form onSubmit={submit} className="rounded-3xl border border-line bg-white p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brass">Step {step} of 4</p>
            <h2 className="mt-1 text-xl text-forest">{steps[step - 1].label}</h2>
          </div>
          <Badge variant="sand">
            <BadgeCheck className="size-3" /> Demo listing
          </Badge>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-sand">
          <div className="h-full rounded-full bg-brass transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
        </div>

        {step === 1 ? (
          <div className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <p className="mb-2 text-[11px] font-semibold text-forest">I want to</p>
                <div className="flex gap-2">
                  {[
                    { label: "Sell", value: "sale" },
                    { label: "Rent out", value: "rent" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => update("listingType", option.value)}
                      className={cn(
                        "rounded-full border px-5 py-2 text-[11px] font-bold transition",
                        form.listingType === option.value
                          ? "border-forest bg-forest text-cream"
                          : "border-line bg-cream text-muted hover:border-forest/40",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <Select id="list-type" label="Property type" value={form.type} onChange={(event) => update("type", event.target.value)}>
                {["Apartment", "Builder Floor", "Villa", "Independent House", "Plot", "Commercial"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
              <Select id="list-city" label="City" value={form.city} onChange={(event) => onCityChange(event.target.value)}>
                {cities.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <Select id="list-locality" label="Locality" value={form.locality} onChange={(event) => update("locality", event.target.value)}>
                {city.localities.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <Input
                id="list-address"
                label="Building / street address"
                placeholder="Tower, block, street"
                value={form.address}
                onChange={(event) => update("address", event.target.value)}
                error={errors.address}
              />
              <Select id="list-bhk" label="Configuration" value={form.bhk} onChange={(event) => update("bhk", event.target.value)}>
                {["1", "2", "3", "4", "5+"].map((item) => (
                  <option key={item} value={item}>
                    {item} BHK
                  </option>
                ))}
              </Select>
              <Input
                id="list-bathrooms"
                label="Bathrooms"
                type="number"
                min={0}
                value={form.bathrooms}
                onChange={(event) => update("bathrooms", event.target.value)}
              />
              <Input
                id="list-area"
                label="Built-up area (sq ft)"
                type="number"
                min={100}
                value={form.area}
                onChange={(event) => update("area", event.target.value)}
                error={errors.area}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="list-floor"
                  label="Floor"
                  type="number"
                  value={form.floor}
                  onChange={(event) => update("floor", event.target.value)}
                />
                <Input
                  id="list-total-floors"
                  label="Total floors"
                  type="number"
                  value={form.totalFloors}
                  onChange={(event) => update("totalFloors", event.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-sand/60 p-3.5">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-brass" />
              <p className="text-[10px] leading-relaxed text-muted">
                The exact address is not shown publicly. Buyers see the locality and a map pin that is slightly offset
                until a visit is confirmed.
              </p>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="list-price">{form.listingType === "rent" ? "Expected monthly rent (₹)" : "Expected price (₹)"}</Label>
                <input
                  id="list-price"
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(event) => update("price", event.target.value)}
                  className={cn(
                    "h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink outline-none transition focus:border-forest/60 focus:ring-4 focus:ring-forest/5",
                    errors.price && "border-terracotta/60",
                  )}
                />
                <p className="mt-1.5 text-[10px] text-brass">
                  {form.price ? `${formatINR(Number(form.price))}${form.listingType === "rent" ? "/month" : ""}` : "Add a realistic expectation"}
                </p>
                {errors.price ? <p className="mt-1 text-[10px] text-terracotta">{errors.price}</p> : null}
              </div>
              <Input
                id="list-maintenance"
                label="Monthly maintenance (₹)"
                type="number"
                value={form.maintenance}
                onChange={(event) => update("maintenance", event.target.value)}
              />
              {form.listingType === "rent" ? (
                <Input
                  id="list-deposit"
                  label="Security deposit (₹)"
                  type="number"
                  value={form.deposit}
                  onChange={(event) => update("deposit", event.target.value)}
                />
              ) : null}
              <Select id="list-possession" label="Possession" value={form.possession} onChange={(event) => update("possession", event.target.value)}>
                <option>Ready to move</option>
                <option>Under construction</option>
                <option>New launch</option>
              </Select>
              <Input
                id="list-age"
                label="Age of property (years)"
                type="number"
                min={0}
                value={form.age}
                onChange={(event) => update("age", event.target.value)}
              />
              <Select id="list-furnishing" label="Furnishing" value={form.furnishing} onChange={(event) => update("furnishing", event.target.value)}>
                <option>Unfurnished</option>
                <option>Semi-furnished</option>
                <option>Fully furnished</option>
              </Select>
              <Select id="list-facing" label="Facing" value={form.facing} onChange={(event) => update("facing", event.target.value)}>
                {["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
              <Select id="list-ownership" label="Ownership" value={form.ownership} onChange={(event) => update("ownership", event.target.value)}>
                <option>Freehold</option>
                <option>Leasehold</option>
              </Select>
              <Select id="list-authority" label="Authority" value={form.authority} onChange={(event) => update("authority", event.target.value)}>
                {["DDA", "CGHS", "MCD", "Noida Authority", "Greater Noida Authority", "YEIDA", "Private"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
              <Input
                id="list-rera"
                label="RERA number (if applicable)"
                placeholder="UPRERAPRJ…"
                value={form.rera}
                onChange={(event) => update("rera", event.target.value)}
              />
            </div>
            <div className="mt-4 rounded-xl border border-line bg-cream p-4">
              <p className="flex items-center gap-2 text-[10px] font-bold text-forest">
                <IndianRupee className="size-3.5 text-brass" /> Our pricing view
              </p>
              <p className="mt-1.5 text-[10px] leading-relaxed text-muted">
                Your expectation works out to roughly{" "}
                <span className="font-semibold text-forest">
                  {preview.psf ? `₹${preview.psf.toLocaleString("en-IN")} per sq ft` : "—"}
                </span>
                . We will benchmark it against current listings and recent transactions before publishing.
              </p>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-6">
            <div className="grid gap-4">
              <Input
                id="list-title"
                label="Listing title"
                placeholder="e.g. Sunlit 3 BHK with a park-facing balcony"
                value={form.title}
                onChange={(event) => update("title", event.target.value)}
                error={errors.title}
                hint={`${form.title.length}/90 characters`}
                maxLength={90}
              />
              <Textarea
                id="list-description"
                label="Description"
                placeholder="What makes this home worth a visit? Mention light, layout, recent work, parking and the honest trade-offs."
                rows={5}
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                error={errors.description}
              />
            </div>

            <div className="mt-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-forest">Photos</p>
                  <p className="text-[9px] text-muted">Up to 6 in the demo. First photo becomes the cover.</p>
                </div>
                <Badge variant="outline">{photos.length}/6</Badge>
              </div>
              {errors.photos ? <p className="mt-1 text-[10px] text-terracotta">{errors.photos}</p> : null}

              <div className="mt-3 grid grid-cols-3 gap-2">
                {photos.map((photo, index) => (
                  <div key={`${photo}-${index}`} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                    <Image src={photo} alt={`Listing photo ${index + 1}`} fill sizes="150px" className="object-cover" />
                    {index === 0 ? (
                      <span className="absolute left-1.5 top-1.5 rounded-full bg-forest px-2 py-0.5 text-[8px] font-bold text-cream">
                        Cover
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setPhotos((current) => current.filter((_, photoIndex) => photoIndex !== index))}
                      className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-white/90 text-forest transition hover:bg-terracotta hover:text-white"
                      aria-label="Remove photo"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                ))}
                {photos.length < 6 ? (
                  <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line bg-cream text-center transition hover:border-forest/40">
                    <ImagePlus className="size-5 text-muted" />
                    <span className="text-[9px] font-semibold text-forest">Add photo</span>
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={addPhotos} />
                  </label>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => {
                  setPhotos((current) => [...current, ...demoPhotos.filter((photo) => !current.includes(photo))].slice(0, 6));
                  toast("Demo photos added.");
                }}
                className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-brass"
              >
                <Sparkles className="size-3" /> Add demo photos
              </button>
              <p className="mt-2 flex items-center gap-1.5 text-[9px] text-muted">
                <UploadCloud className="size-3" /> In production, photos are compressed, watermarked and checked for
                duplicates.
              </p>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-semibold text-forest">Amenities</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3">
                {amenityList.map((amenity) => (
                  <label key={amenity} className="flex cursor-pointer items-center gap-2 text-[10px] text-forest">
                    <input
                      type="checkbox"
                      checked={form.amenities.includes(amenity)}
                      onChange={(event) =>
                        update(
                          "amenities",
                          event.target.checked
                            ? [...form.amenities, amenity]
                            : form.amenities.filter((item) => item !== amenity),
                        )
                      }
                      className="size-3.5 rounded border-line accent-forest"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="mt-6">
            <div className="rounded-2xl border border-line bg-cream p-4">
              <div className="flex items-start gap-3">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                  <Image src={photos[0] ?? demoPhotos[0]} alt="Listing preview" fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-brass">Preview</p>
                  <p className="mt-1 line-clamp-2 text-[12px] font-bold text-forest">{preview.title}</p>
                  <p className="mt-0.5 text-[10px] text-muted">
                    {preview.localityName}, {preview.cityName}
                  </p>
                  <p className="mt-1 text-[12px] font-bold text-brass">
                    {form.listingType === "rent" ? `${formatINRFull(Number(form.price))}/mo` : formatINR(preview.price)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input
                id="list-name"
                label="Your name"
                placeholder="Full name"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                error={errors.name}
              />
              <Input
                id="list-phone"
                label="Phone / WhatsApp"
                placeholder="+91 98XXX XXXXX"
                type="tel"
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
                error={errors.phone}
              />
              <Input
                id="list-email"
                label="Email (optional)"
                placeholder="you@example.com"
                type="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
              />
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-semibold text-forest">Choose a listing plan</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { name: "Explorer", price: "Free", note: "1 listing · basic placement", features: ["Basic enquiry inbox", "Standard search placement"] },
                  { name: "Signature", price: "₹2,999/mo", note: "8 listings · 2 featured", features: ["Verified badge", "Featured placement", "Lead dashboard"] },
                ].map((plan) => (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => update("plan", plan.name)}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition",
                      form.plan === plan.name ? "border-forest bg-forest text-cream" : "border-line bg-white hover:border-forest/30",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("text-[12px] font-bold", form.plan === plan.name ? "text-cream" : "text-forest")}>{plan.name}</p>
                      <p className={cn("text-[11px] font-bold", form.plan === plan.name ? "text-brass-light" : "text-brass")}>{plan.price}</p>
                    </div>
                    <p className={cn("mt-0.5 text-[9px]", form.plan === plan.name ? "text-cream/60" : "text-muted")}>{plan.note}</p>
                    <div className="mt-2 space-y-1">
                      {plan.features.map((feature) => (
                        <p
                          key={feature}
                          className={cn("flex items-center gap-1.5 text-[9px]", form.plan === plan.name ? "text-cream/70" : "text-muted")}
                        >
                          <Check className="size-2.5" /> {feature}
                        </p>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-2.5 rounded-xl border border-line bg-cream p-3.5">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => update("consent", event.target.checked)}
                className="mt-0.5 size-4 rounded border-line accent-forest"
              />
              <span className="text-[10px] leading-relaxed text-muted">
                I confirm I am the owner or an authorised agent for this property, the details are accurate, and I agree
                to the listing terms and privacy policy. I understand this is a demo and no listing will be created.
              </span>
            </label>
            {errors.consent ? <p className="mt-1 text-[10px] text-terracotta">{errors.consent}</p> : null}
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-sand/60 p-3.5">
              <Building2 className="size-4 shrink-0 text-brass" />
              <p className="text-[10px] leading-relaxed text-muted">
                {form.plan === "Signature"
                  ? "Signature plan selected. In the demo, no payment will be collected."
                  : "Explorer plan selected. Your first listing is free."}
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          {step > 1 ? (
            <Button type="button" variant="ghost" icon={ArrowLeft} onClick={back}>
              Back
            </Button>
          ) : (
            <p className="text-[10px] text-muted">Takes about 4 minutes.</p>
          )}
          {step < 4 ? (
            <Button type="button" onClick={next} iconRight={ArrowRight}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={submitting} iconRight={submitting ? undefined : ArrowRight}>
              {submitting ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
              {submitting ? "Publishing draft…" : "Publish demo listing"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
