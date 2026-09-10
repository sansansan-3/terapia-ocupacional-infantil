import {
  Hand,
  PersonStanding,
  Waves,
  Target,
  Shirt,
  Brain,
  Users,
  Eye,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { CategoriaId } from "@/data/types";

const ICONOS: Record<CategoriaId, LucideIcon> = {
  "motricidad-fina": Hand,
  "motricidad-gruesa": PersonStanding,
  "integracion-sensorial": Waves,
  atencion: Target,
  autonomia: Shirt,
  cognitiva: Brain,
  socializacion: Users,
  percepcion: Eye,
  escolares: GraduationCap,
};

export function IconoCategoria({
  categoriaId,
  className,
}: {
  categoriaId: CategoriaId;
  className?: string;
}) {
  const Icono = ICONOS[categoriaId] ?? Sparkles;
  return <Icono className={className} aria-hidden="true" />;
}
