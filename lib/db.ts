export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  gallery: string[];
  vibes: string[];
  category: string;
  createdAt: string;
  description: string;
  shortDescription: string;
  bullets: string[];
  ratio: string;
  accent: "primary" | "secondary" | "tertiary";
  featuredLabel?: string;
};

export const vibeFilters = [
  "All Drops",
  "Cyberpunk Core",
  "Y2K Nostalgia",
  "Hyper-Luxe",
  "Techwear",
  "Minimalist Glass",
  "Neon Pop",
  "Digital Art",
] as const;

export const products: Product[] = [
  {
    id: "aura-watch-s2",
    name: "Aura Watch S2",
    price: 299,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvIk-3EX-zDQQlUQ4IuGPXP0TxmoX_E6o3NwZw10b7Tjje2ro_J-cKf6goHv3SsJubKiCBHhXriXgF3wJsE_pN-1wX57abOHsHI3IemH3_a_UTl2Xc2IatNrwJhDkPQhOZ8hPHiQySaf9vulyWv5UGvFvv0oClpp0Z1hy2mhZ_WUq17fHU3kHBDBlXOUTfRLugPA3bBy8uTCoEfUJs0AYFR8M5pEPkDz9C3QAHUVA7NBC3Bp45k0iDBFOGOOIsC-eJQFKTgP3A67E",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvIk-3EX-zDQQlUQ4IuGPXP0TxmoX_E6o3NwZw10b7Tjje2ro_J-cKf6goHv3SsJubKiCBHhXriXgF3wJsE_pN-1wX57abOHsHI3IemH3_a_UTl2Xc2IatNrwJhDkPQhOZ8hPHiQySaf9vulyWv5UGvFvv0oClpp0Z1hy2mhZ_WUq17fHU3kHBDBlXOUTfRLugPA3bBy8uTCoEfUJs0AYFR8M5pEPkDz9C3QAHUVA7NBC3Bp45k0iDBFOGOOIsC-eJQFKTgP3A67E",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkvQwDsw8tSrHpJe8an26E1vUP4bQcrDlJcI3MvQsKhcSgDmMyvBgmJ7qF-0SAFkDJGlfOaF9WkZ1MwdfDJUUyn0Z-FBBfGKNAbGWtdKKipZZQy4JZ7LgbJqPRx5zRaE2Ew4yVCWjCri6EPIZkJ04Ce99a614Xv76cZgSYCX7XvT_Jz_ayaIskX2fSLx1IeOrtngZtkdV4n-G8LEC3zKYEwOKX1G4eM_OhPCaj15DCLXZxLX_SKr450jhYU-FMe-hlvh3JzzXhJN0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQLOvTFBqBCzB23-2EZM5YeTnDxWKB72WArT6BNETp_2zRpdz5YLPzd2cFuMe1drJpXAu3dPHk_YUZWP6D3s9ROHMGKyuQ62-Q1-RAnzd1lSRykBH1Lzo-AoMSYshEoJMwVVFfxrxyu9JCdYxl7sCigkzOAzx9j61yNqyfSd1owjbUkUUwJFjPXoMh2LywB75LXNBlT5THGnqLt9B-uMOMjgKzuCzTBkAgruWmexOjsQtXlCtgNMi8MW1r1cn6yMCGX1Stk4-hTLg",
    ],
    vibes: ["Minimalist Glass", "Accessories", "Hyper-Luxe"],
    category: "Accessories",
    createdAt: "2026-04-10T00:00:00.000Z",
    description:
      "A polished smart timepiece built for low-light workspaces, all-night edits, and sharp monochrome fits.",
    shortDescription:
      "Clean minimal product shot of a high-end tech gadget with pink and blue ambient lighting.",
    bullets: ["Always-on glow face", "Wireless fast charging", "2-day adaptive battery"],
    ratio: "4 / 5",
    accent: "primary",
    featuredLabel: "Hero Pick",
  },
  {
    id: "vapor-core-1",
    name: "Vapor Core 1.0",
    price: 249,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8t5TcN5BSAmsYD0VIZIXV6LKvwSw-EhEUjm5ELRont_yR1RNrM2WpX5zRuFw_Rdy7GEjAWYNyPIthPPsY61xGE0h8vHTvsN-4BTZNs4NYgNwxwRNFNNJg0cfHTpaGddyqTrx4aha5DNVQxrVjjgsQDmt0nFcfz_abIXHj9YERI7RsFGMeT86mVMhzNFF7SCdD_vkpc3pP-1YIXNFleN_-EfU2B942E9fUeecMVn3f8rf7SzAA3edCq-0-NhQF34fZ84VKODHEEEU",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8t5TcN5BSAmsYD0VIZIXV6LKvwSw-EhEUjm5ELRont_yR1RNrM2WpX5zRuFw_Rdy7GEjAWYNyPIthPPsY61xGE0h8vHTvsN-4BTZNs4NYgNwxwRNFNNJg0cfHTpaGddyqTrx4aha5DNVQxrVjjgsQDmt0nFcfz_abIXHj9YERI7RsFGMeT86mVMhzNFF7SCdD_vkpc3pP-1YIXNFleN_-EfU2B942E9fUeecMVn3f8rf7SzAA3edCq-0-NhQF34fZ84VKODHEEEU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlXtvzoOWn_5FrigGOVZ5t9Twa4hUxEzJzQemU-1J8iVx_PIHZK5F2nEWTBtRrDN3i-htwnbmcxY9lXcqtMgv8-SSIYR-na79IkgUZREZaQkmkB6rh_vtn4Z0m1jkDMVfNsGPE4m_s42d_RRNWF38jlohrxN9vwESVDF06y6DJEYepfRvE6CePh23Ghmk5cuighXLEpSu5INSPqlzZAcT3A5tpwmnBgNtJeCuBuhfZrTW4ay6Gvc1tF2E_Lk_SoDK4PRUv5tx4pAo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPVCLd3ec2yr1aPjowpYsLtAcFJap3bWNJUvGgKrcT9Ndcp0ZWO_IUCsITIhzXq7funMkpZFG4H4m43mNVoINaXLTvb97m0EQp7vfnNckeSbo-OECMqNz3xNsI6ZzXej_iFQ021kbMtpBLzPWaNftwtRkgj4BgEgangC-QktfXP-4vF5x2XRjuS25ruLhaC_Seij4EtRNr7sVcPc1CpSh4BMp5u5o2dAeEjkFLOee8-z4yjH3wTvZ59P_xy-uG2GlNgNKub3aOBrQ",
    ],
    vibes: ["Cyberpunk Core", "Performance", "Sustainable"],
    category: "Footwear",
    createdAt: "2026-04-09T00:00:00.000Z",
    description:
      "Engineered for digital nomads with responsive foam, sharp edge contours, and a finish that glows under ambient light.",
    shortDescription:
      "High-end minimalist photo of a neon red sneaker floating against a dark purple studio background.",
    bullets: ["Featherweight chassis", "Bioluminescent outsole", "Cloud-reactive cushioning"],
    ratio: "3 / 4",
    accent: "primary",
    featuredLabel: "New Drop",
  },
  {
    id: "vortex-hud-goggles",
    name: "Vortex HUD Goggles",
    price: 249,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaE2CMaw4RYYb9qKnFbJUv3FbSUz0JG50pXROHP34jx-uIsP5ux0FnlswN2REY6zgV3IoAviSR2pyhOvn2RvnzKKX8y9Ie8GqaDS48VcuCFD2x5AtuAduvmupqjEZoX9CddPm0DDG1nV3NRqmM07HkM_VJsdnw8eWNko9d_ibEizBiRBZCdhcjlWa9xz3DDTxqr4PdkvCOJUFSV09fc-O_oLfbseemTTXbl27hB9yu6kAsY9utU7Ymn4jfPFUi3LeKamuGxbszyqE",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaE2CMaw4RYYb9qKnFbJUv3FbSUz0JG50pXROHP34jx-uIsP5ux0FnlswN2REY6zgV3IoAviSR2pyhOvn2RvnzKKX8y9Ie8GqaDS48VcuCFD2x5AtuAduvmupqjEZoX9CddPm0DDG1nV3NRqmM07HkM_VJsdnw8eWNko9d_ibEizBiRBZCdhcjlWa9xz3DDTxqr4PdkvCOJUFSV09fc-O_oLfbseemTTXbl27hB9yu6kAsY9utU7Ymn4jfPFUi3LeKamuGxbszyqE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfLBgFtxB7wrEe65f9DH3tW_2EfhE0zqq74gmfKDoH8QKYQPV3UaNzB4gKPeS9NRUEWClfd0qxHCvvyKtrX-j1jwhcxk_4Am8RRwKPs_IaFIGdYOkdKyAbPHLr8a-vvxH6bzZDwDEVX3g_wxqDXJ2gMTsp9_Wvh3OuetA6QYkpbYxiqq0Gbr7pCCNMZFP0vtuS9PXpSIC-DJdEzqrZyw4_mxMPzCaUrvgNLyPnq1caE-hRPOSiRcmpr6iIVEfydTcpzcWJcFu0aNk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpAq35kMPbP4hxFWQFMeIMTifZ-8HS3jdJ0UrX1qCELj7q928joCPtcMd2bsURxRykUswWEgAB_nB4IflQlf41TvUpiAILfn-raR6gdj6I8jPKSUxs-6QKrrFRgoG-zOD3sliSv2KM28hIq-GBSNoqvNdAvU16OJsaUQl_t3A1vPN9HxeCAvI7efMq25b_Zl3gmWcZSxypxC7LiOtIfHKyKz_eQiXEN43jHekAZac70sqiGAEIe-6nove8QqCV2psZH7F2GJ8Rkk4",
    ],
    vibes: ["Techwear", "Cyberpunk Core", "Hyper-Luxe"],
    category: "Accessories",
    createdAt: "2026-04-08T00:00:00.000Z",
    description:
      "Augmented eyewear with polarized lenses and a silhouette tuned for after-dark city runs.",
    shortDescription: "A neon-lit workstation aesthetic translated into a wearable statement piece.",
    bullets: ["Polarized shield lens", "Heads-up glance display", "Impact-safe alloy frame"],
    ratio: "3 / 4",
    accent: "tertiary",
  },
  {
    id: "synapse-controller",
    name: "Synapse Controller",
    price: 1299,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0zpHIQB1quPNXw-6bl1KQDVe3uPDmDunY8B_KnEemkL7QKj-z1DZud-GoQX2DbeDSGEzSQrW1ZqQ_9fnS5sSaU7KR_zvyL41foXtxCAlHi-MMjBuDtMMkhb4-AQMThwTKWygnjV3AtdbuqnVa7_8J6WgBvGUPJ7m9zpUkYZIjatzIRHeUqXcAAQYrvm_Nkot5EzO-UkXmPl4ohlZJFbGIxC5astGgni1KtTAIh_kWgSSEEO2viQlfVWT9Hw-TzGCT_Yra3eHgS_0",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0zpHIQB1quPNXw-6bl1KQDVe3uPDmDunY8B_KnEemkL7QKj-z1DZud-GoQX2DbeDSGEzSQrW1ZqQ_9fnS5sSaU7KR_zvyL41foXtxCAlHi-MMjBuDtMMkhb4-AQMThwTKWygnjV3AtdbuqnVa7_8J6WgBvGUPJ7m9zpUkYZIjatzIRHeUqXcAAQYrvm_Nkot5EzO-UkXmPl4ohlZJFbGIxC5astGgni1KtTAIh_kWgSSEEO2viQlfVWT9Hw-TzGCT_Yra3eHgS_0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbTDlbnHxHxrvCH8l2yoRtZxbA8yW9rWWefb9wBCJHpb-Sdxs2r0G16P9ehWQzsKCkt_6wtFi_8GQI0e4PdXaiM4kbyBjHh_KXsekuNs1v-i4KasZMUZNYKerKG1-z_-glWKiY2a4CtGwdhNUWUW2Onx-49-ISydq_Kk1F7JaKvX7EfzVcLlBQAPfXnjrr49jA0cIKdDBLX4BjiPQP2w_nU2EN5VIOpDKi2KlIdRs9whUgzO5vVBYkbFB8a2au5ntoMd-_4TIkjn0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCz_WcsQ3Ln_ctof9eCdcqEBk97bKbn0ClUF2wLMK9xxuBpDfGvSSr66M51-BdoHJSaLm2iWUwwjNQP_2ojFYTkjp70sJVYgiqI_fIhbJR06DwPgK6XfaTl8-kJsZGWLrUGLqe8cOET_u_qNn-DTWlw8kKmr0X7POWv6IDe_cMP5NZRLp6W9C7dCXyCNtyMe6jctwHLH9jxdzm5mlOjlu9ytInAK3ClUGrLkFU2e1j2_7kMmLl-78NIoxoef4LQDjCDQC0nxZkVEnY",
    ],
    vibes: ["Hardware", "Digital Art", "Minimalist Glass"],
    category: "Hardware",
    createdAt: "2026-04-07T00:00:00.000Z",
    description:
      "A tactile controller slab with luminous edge feedback and an interface built for immersive play.",
    shortDescription:
      "Close-up of a robotic hand glowing with turquoise circuitry in a dark studio setting.",
    bullets: ["Haptic pulse shell", "Low-latency input grid", "Studio-grade build quality"],
    ratio: "1 / 1",
    accent: "tertiary",
  },
  {
    id: "amethyst-pulse",
    name: "Amethyst Pulse",
    price: 89,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXFztMEsiPk1JCbWmRvmRX1GpVPxHSagMprf8wARBlLNEpKKCheMo4Pn_77gzYGZTfOXzPJswgZ6zdxiCdssLBIbz6JUq8EXZnHHLtUUzLZ55C2PXr-zo9iTE8pBHcYXoIC4nfJqqvekVZPR-YUQO5KIDUMxwot1xttnxfu9mo2FX9cpGq_X42RhimcvU0KTRfndWik5RaYksYgVoJo_NOg_CYB0N5piokTMMhLM79StATxb8-t59tz9o0tQyI66r4x0WmhxSi2Ng",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXFztMEsiPk1JCbWmRvmRX1GpVPxHSagMprf8wARBlLNEpKKCheMo4Pn_77gzYGZTfOXzPJswgZ6zdxiCdssLBIbz6JUq8EXZnHHLtUUzLZ55C2PXr-zo9iTE8pBHcYXoIC4nfJqqvekVZPR-YUQO5KIDUMxwot1xttnxfu9mo2FX9cpGq_X42RhimcvU0KTRfndWik5RaYksYgVoJo_NOg_CYB0N5piokTMMhLM79StATxb8-t59tz9o0tQyI66r4x0WmhxSi2Ng",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzTGJcJs-KKznJ4rqPMA5hJ275MJnPnnLSZDg9nF6dVvaEGNiMp2b5XwLEnt9JuDmZAhZDwBaBCUWsFy8muiXXJ7aFhslsoYfHowXKdOZvYa5ePiMq_gK5ohRhDjFmf5WT70Yovgk2ArF2GVevL3B0ZFrWG6lUWL8UcqUP6Ij6e9ev4KHNxx5tucseeKSSq7YW1NfNIwoH5BbhunBadeTN-14oQLgVT_iAwJB7esiHCbNfVEWfBmodrvMDsu0MWJbqlZONW6mT6EE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQLOvTFBqBCzB23-2EZM5YeTnDxWKB72WArT6BNETp_2zRpdz5YLPzd2cFuMe1drJpXAu3dPHk_YUZWP6D3s9ROHMGKyuQ62-Q1-RAnzd1lSRykBH1Lzo-AoMSYshEoJMwVVFfxrxyu9JCdYxl7sCigkzOAzx9j61yNqyfSd1owjbUkUUwJFjPXoMh2LywB75LXNBlT5THGnqLt9B-uMOMjgKzuCzTBkAgruWmexOjsQtXlCtgNMi8MW1r1cn6yMCGX1Stk4-hTLg",
    ],
    vibes: ["Neon Pop", "Decor", "Y2K Nostalgia"],
    category: "Decor",
    createdAt: "2026-04-06T00:00:00.000Z",
    description:
      "A compact neon wall accent that softens darker rooms with a saturated magenta glow.",
    shortDescription:
      "Stylized neon heart sign glowing deep violet and pink against a dark textured wall.",
    bullets: ["Low-heat glass tubing", "Dimmer compatible", "Wall mount included"],
    ratio: "4 / 3",
    accent: "secondary",
  },
  {
    id: "ghost-shell-parka",
    name: "Ghost-Shell Parka",
    price: 450,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvjVYOAf3xlHIcealh0yZIi6MFHLifdT09Yl_uzHiTVk1zSYUnUanAn_CmMhbweac3-ocvYLU2ej1kZgR_DHj98e5E_tPSl5gu2nwqiuwkgsj6Oh9VbFA5Oa_RCDPHpvG2cXJpPZ8cAhbjyDs1G9NwDgWBlysF_fd8uF-Ve60Eh00Lid-3IoQas6CTFeWUjYQHorWlWB0f-2hO-JQHeW7gbBJWeQEjdqGtkKdKQHkdFDHBlVBUUGWBTscPVdYZkFb_1YqppFOefyQ",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvjVYOAf3xlHIcealh0yZIi6MFHLifdT09Yl_uzHiTVk1zSYUnUanAn_CmMhbweac3-ocvYLU2ej1kZgR_DHj98e5E_tPSl5gu2nwqiuwkgsj6Oh9VbFA5Oa_RCDPHpvG2cXJpPZ8cAhbjyDs1G9NwDgWBlysF_fd8uF-Ve60Eh00Lid-3IoQas6CTFeWUjYQHorWlWB0f-2hO-JQHeW7gbBJWeQEjdqGtkKdKQHkdFDHBlVBUUGWBTscPVdYZkFb_1YqppFOefyQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPdmqEz2vJInMjXtFrrJa62YdKBBuhFID2I_9vGqaH6CvrLaDjWwkkc3sRkD6pz-ovhTerBk_hMSEEwveQSklHKEV2eoUzq42Iful4ohFmR4MJFWx3ZGw-UWHAcfEmQQT9Y4SWwY3sBKdDhPhI2kndsySfxNmhULodaqsE3GYzYM41s_68YnV_n-_DxPu-BGNBRcraM2BwSRKpDCwsJ9V1FC6qtc3PFRt6xoJkz273cTw0-Nyo1w1aUY4CEm57z2m0kAB127vqv_4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpAq35kMPbP4hxFWQFMeIMTifZ-8HS3jdJ0UrX1qCELj7q928joCPtcMd2bsURxRykUswWEgAB_nB4IflQlf41TvUpiAILfn-raR6gdj6I8jPKSUxs-6QKrrFRgoG-zOD3sliSv2KM28hIq-GBSNoqvNdAvU16OJsaUQl_t3A1vPN9HxeCAvI7efMq25b_Zl3gmWcZSxypxC7LiOtIfHKyKz_eQiXEN43jHekAZac70sqiGAEIe-6nove8QqCV2psZH7F2GJ8Rkk4",
    ],
    vibes: ["Apparel", "Techwear", "Streetwear"],
    category: "Apparel",
    createdAt: "2026-04-05T00:00:00.000Z",
    description:
      "Weather-shielded outerwear with reflective fibers, oversized volume, and a silhouette tuned for fast movement.",
    shortDescription:
      "High fashion model wearing an iridescent reflective jacket in a rainy neon street scene.",
    bullets: ["Water-sealed shell", "Reflective yarn weave", "Oversized utility cut"],
    ratio: "2 / 3",
    accent: "primary",
  },
  {
    id: "glass-time-chrono",
    name: "Glass-Time Chrono",
    price: 320,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkvQwDsw8tSrHpJe8an26E1vUP4bQcrDlJcI3MvQsKhcSgDmMyvBgmJ7qF-0SAFkDJGlfOaF9WkZ1MwdfDJUUyn0Z-FBBfGKNAbGWtdKKipZZQy4JZ7LgbJqPRx5zRaE2Ew4yVCWjCri6EPIZkJ04Ce99a614Xv76cZgSYCX7XvT_Jz_ayaIskX2fSLx1IeOrtngZtkdV4n-G8LEC3zKYEwOKX1G4eM_OhPCaj15DCLXZxLX_SKr450jhYU-FMe-hlvh3JzzXhJN0",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkvQwDsw8tSrHpJe8an26E1vUP4bQcrDlJcI3MvQsKhcSgDmMyvBgmJ7qF-0SAFkDJGlfOaF9WkZ1MwdfDJUUyn0Z-FBBfGKNAbGWtdKKipZZQy4JZ7LgbJqPRx5zRaE2Ew4yVCWjCri6EPIZkJ04Ce99a614Xv76cZgSYCX7XvT_Jz_ayaIskX2fSLx1IeOrtngZtkdV4n-G8LEC3zKYEwOKX1G4eM_OhPCaj15DCLXZxLX_SKr450jhYU-FMe-hlvh3JzzXhJN0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvIk-3EX-zDQQlUQ4IuGPXP0TxmoX_E6o3NwZw10b7Tjje2ro_J-cKf6goHv3SsJubKiCBHhXriXgF3wJsE_pN-1wX57abOHsHI3IemH3_a_UTl2Xc2IatNrwJhDkPQhOZ8hPHiQySaf9vulyWv5UGvFvv0oClpp0Z1hy2mhZ_WUq17fHU3kHBDBlXOUTfRLugPA3bBy8uTCoEfUJs0AYFR8M5pEPkDz9C3QAHUVA7NBC3Bp45k0iDBFOGOOIsC-eJQFKTgP3A67E",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCcKeSP1fBvSveHARgLpn0VkJdbi8IkLc9ds9tPOxIq3eAcnBQBzzLpKee3i8CehljSBy2TSShZe_RvOAHj9LbmGuOr8znRixz3n8j7iDolz_sPRAoBI95foFATsRxemsib3jwHAhpBOHxErf7U615U81B1WnmVy0OgVAVvRVgHb8IxRIOPL_9FHUrEcBtjjU1Orf1GTWkbcOlx707TYR3IaVFAiPhz4zFC-JxgMQ5CeGFs9sVIa9-o2AvJ90cu4NEqUd4_BwhQcx0",
    ],
    vibes: ["Accessories", "Minimalist Glass", "Hyper-Luxe"],
    category: "Accessories",
    createdAt: "2026-04-04T00:00:00.000Z",
    description:
      "A transparent-faced chronograph that blends industrial precision with gallery-level restraint.",
    shortDescription:
      "Minimalist sleek watch with a transparent face on a black reflective surface.",
    bullets: ["Transparent dial architecture", "Brushed titanium case", "Precision quartz movement"],
    ratio: "1 / 1",
    accent: "tertiary",
  },
  {
    id: "fragment-horizon",
    name: "Fragment Horizon",
    price: 95,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzTGJcJs-KKznJ4rqPMA5hJ275MJnPnnLSZDg9nF6dVvaEGNiMp2b5XwLEnt9JuDmZAhZDwBaBCUWsFy8muiXXJ7aFhslsoYfHowXKdOZvYa5ePiMq_gK5ohRhDjFmf5WT70Yovgk2ArF2GVevL3B0ZFrWG6lUWL8UcqUP6Ij6e9ev4KHNxx5tucseeKSSq7YW1NfNIwoH5BbhunBadeTN-14oQLgVT_iAwJB7esiHCbNfVEWfBmodrvMDsu0MWJbqlZONW6mT6EE",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzTGJcJs-KKznJ4rqPMA5hJ275MJnPnnLSZDg9nF6dVvaEGNiMp2b5XwLEnt9JuDmZAhZDwBaBCUWsFy8muiXXJ7aFhslsoYfHowXKdOZvYa5ePiMq_gK5ohRhDjFmf5WT70Yovgk2ArF2GVevL3B0ZFrWG6lUWL8UcqUP6Ij6e9ev4KHNxx5tucseeKSSq7YW1NfNIwoH5BbhunBadeTN-14oQLgVT_iAwJB7esiHCbNfVEWfBmodrvMDsu0MWJbqlZONW6mT6EE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCz_WcsQ3Ln_ctof9eCdcqEBk97bKbn0ClUF2wLMK9xxuBpDfGvSSr66M51-BdoHJSaLm2iWUwwjNQP_2ojFYTkjp70sJVYgiqI_fIhbJR06DwPgK6XfaTl8-kJsZGWLrUGLqe8cOET_u_qNn-DTWlw8kKmr0X7POWv6IDe_cMP5NZRLp6W9C7dCXyCNtyMe6jctwHLH9jxdzm5mlOjlu9ytInAK3ClUGrLkFU2e1j2_7kMmLl-78NIoxoef4LQDjCDQC0nxZkVEnY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQACVaQlWgr-y0jotHE3PMBlFe2hzAvUhWgfaF6dt17oxaRVOBrZPncWcBmpNp2x6RGmp-rlrkH6q0t4MbrlcjmbX36QhOJ8A6GJSjYf69cnS0pH49ZBXkJ4ecPpbOIocT6rKyrQNrZkXwxuxyd-EP_jfsMcDdYADDR5EqUa2kP-kj5lKVbhxW55njwm-z4vKTurVOClI2AM0vGY493OhbKPXOOBGaXBc6k9mhjgxQqtHB2NrwmHzf3inwc9Mxuy4_VgbtkvYK9nY",
    ],
    vibes: ["Digital Art", "Neon Pop", "Minimalist Glass"],
    category: "Art",
    createdAt: "2026-04-03T00:00:00.000Z",
    description:
      "A framed abstract print that pulls hard lines and neon geometry into a dark interior.",
    shortDescription:
      "Abstract architectural form with neon pink lines against a starless black sky.",
    bullets: ["Museum-grade matte stock", "Shadow-gap frame", "Edition number included"],
    ratio: "3 / 4",
    accent: "primary",
  },
  {
    id: "aura-pods-gen-3",
    name: "Aura Pods Gen 3",
    price: 199,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnIEnhqwpyVWzmCQoGkxUN9euigBFQ2fIOvb37JNadYzH8Y_o3pvOJpZNW3dTlOBzuvND6Um7kdIMPBe_I4PFZxUll-4Zp7HSknFD_wLeGHPArJAoD07dBf_SCrL6wM9c2yb-lMLS9NuOrJVjGHuvRkEzK4ey_pcPDI93hxu7FjX9QBHQmZ0vpf7YWqlt075zlyX0OshQvn3pJl33FsYLSlCV-FYoH10_j4WUuOXwTscBqAt9rLXeQbTCD78vJcsXECA65bazHFgo",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnIEnhqwpyVWzmCQoGkxUN9euigBFQ2fIOvb37JNadYzH8Y_o3pvOJpZNW3dTlOBzuvND6Um7kdIMPBe_I4PFZxUll-4Zp7HSknFD_wLeGHPArJAoD07dBf_SCrL6wM9c2yb-lMLS9NuOrJVjGHuvRkEzK4ey_pcPDI93hxu7FjX9QBHQmZ0vpf7YWqlt075zlyX0OshQvn3pJl33FsYLSlCV-FYoH10_j4WUuOXwTscBqAt9rLXeQbTCD78vJcsXECA65bazHFgo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBv9mzF_ONLqs3s1eueLqPGQCTi6FDdecyOhVaX-SmlWVNfWPpIpn80FjilkLsewaA5EMfpI5BbphPu8u3iLGXlX9XbhTPCwt8THcKXfNolz-2XRJtAK-wLLHnEY1fXa09pwNswV_5_KECW70Ktk4vgAOy4OnAxMtKkocO9DvhKCRziEEX6UGZuvbBqp58FRdh62NCvL5f8Kn2BXdO0HoIqunGlerVizV4D4LNGVoWv50mS_2QLSovwJV9hHjfAbIp6hviHra_NZfQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0fnrsS7kXWGQb2VJyH6a9-0ktO0Sv2lNFbgmlWjP2Ee1Y1zQV_jOaBm3Qq73PPCXWlMUgfUC2kIwkXOMFxTpQC9bRkVV0rX8TtBm6fC4XubiVeHC0KGjQDjhCfe_nBIGjrPdKD-X-JBZqC6j-aavVrWyds9fHzL72-e6kdcZNobHRv4qcGnK5KUjwjASOd6qFE158j_SuG18gudIAA7FYAa6WNOMo54cJ7AGxwHipxhuG-N0ypDzYSHuUtfDKWliHL-GOfgGq7JQ",
    ],
    vibes: ["Audio", "Hyper-Luxe", "Minimalist Glass"],
    category: "Audio",
    createdAt: "2026-04-02T00:00:00.000Z",
    description:
      "Low-profile earbuds with cinematic bass and a charging case that reads like a sculpted object.",
    shortDescription:
      "Futuristic black earbuds with glowing blue circles on a dark metallic surface.",
    bullets: ["Adaptive spatial audio", "32-hour battery case", "Noise canceling"],
    ratio: "4 / 3",
    accent: "tertiary",
  },
  {
    id: "neon-pulse-01",
    name: "Neon Pulse 01",
    price: 499,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5u8l2IuvsnIcDupYWciYJrbMDlOhoiUUfS1YagmgQESPaG5T37QOEPctplecrpWNE78DUKjdBRfplbbrSYrfih7wew7nvDJdom90wGcfYTHWVarDmDE8SkrNG3y1X-qxh2okpDe91QLTmXKSrbOqEWwcebbSa1ZkQXtRFi5Sq8RfQE7o1zp1qeGkokZ_lbwFWdIrmq_EoEFdRGlOKU79j5onDrnQ6axzDcjjf7CvQkpK7o6ErTkoO8Mj4tIEkb1C1q9TPvPau6rc",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5u8l2IuvsnIcDupYWciYJrbMDlOhoiUUfS1YagmgQESPaG5T37QOEPctplecrpWNE78DUKjdBRfplbbrSYrfih7wew7nvDJdom90wGcfYTHWVarDmDE8SkrNG3y1X-qxh2okpDe91QLTmXKSrbOqEWwcebbSa1ZkQXtRFi5Sq8RfQE7o1zp1qeGkokZ_lbwFWdIrmq_EoEFdRGlOKU79j5onDrnQ6axzDcjjf7CvQkpK7o6ErTkoO8Mj4tIEkb1C1q9TPvPau6rc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GExcp6pKTsRbWU362oZg8MCsE5dIqnRthneIw3Vr6RlXof0-bq-LyY9q7wYtdmQrhIMuLGyJxZ43JMpg3jD7UxFl_xk1OoCVofp8tmM8_jakCe9imnNCcMJOo3eXHJYo5M0Uxedxr50v8S4NIlgP3DUW-F5-lmMN5j0QqsSIplE7jr1PhIEEPaF6Z9bCqxZjqxs8CU_XklbOl6QtdfBGBf978m4O7KR6QKWgIMJZMbvOXBXSdeRKIpA49vAHrd9flqXHcYx-C_I",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKq-amnZkSWs-o_FZmL0i6HihmnUIYgd_4Fz6YJDjS29b8Gjrapx_gEAa-wGkV6guIV0P4aNbDN-EryGujl81Dbdy-44PBfxRy2i3BPaZAHHrldp49VtiMulIzsuSQ4hHRm9_LEu-C9_FxtAgwn8-uUNT3fkAcUp0G6is9Of0W0OGBhbWnViU0xpuQPLa_nqvyztXzGoh38XMnxFA1DJrbYsCb2yfuZJPg3cLazIBvPhZv5azU9BiLCky-M6qSx26dK5gMrh_nd3c",
    ],
    vibes: ["Cyberpunk Core", "High Fidelity", "Metallic"],
    category: "Hardware",
    createdAt: "2026-04-01T00:00:00.000Z",
    description:
      "A centerpiece object for desks and shelves with reactive RGB diffusion and atmospheric battery life.",
    shortDescription:
      "A futuristic glass-like orb suspended over a bowl with moody studio lighting.",
    bullets: ["Reactive RGB integration", "48-hour atmospheric battery", "Aerospace polymer shell"],
    ratio: "4 / 5",
    accent: "primary",
    featuredLabel: "Limited Edition",
  },
];

export function getProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.slice(0, 8);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductsByVibe(vibe: string, excludeId?: string) {
  if (vibe === "All Drops") {
    return products.filter((product) => product.id !== excludeId);
  }

  const normalizedVibe = vibe.toLowerCase().replace(" core", "");

  return products.filter((product) => {
    if (product.id === excludeId) {
      return false;
    }

    return product.vibes.some((productVibe) =>
      productVibe.toLowerCase().includes(normalizedVibe),
    );
  });
}

export function getRelatedProducts(product: Product) {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        candidate.vibes.some((vibe) => product.vibes.includes(vibe)),
    )
    .slice(0, 4);
}

export function getSuggestedProducts(ids: string[]) {
  const source = products.filter((product) => ids.includes(product.id));
  const sourceVibes = source.flatMap((product) => product.vibes);

  if (!sourceVibes.length) {
    return products.slice(0, 4);
  }

  return products
    .filter((product) => !ids.includes(product.id))
    .sort((left, right) => {
      const leftScore = left.vibes.filter((vibe) => sourceVibes.includes(vibe)).length;
      const rightScore = right.vibes.filter((vibe) => sourceVibes.includes(vibe)).length;

      return rightScore - leftScore;
    })
    .slice(0, 4);
}
