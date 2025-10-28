{
  description = "Next.js 15 development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            nodePackages.pnpm
            nodePackages.typescript
            nodePackages.eslint
            git
          ];

          shellHook = ''
            echo "🚀 Next.js 15 development environment loaded!"
            echo "📦 Node.js $(node --version)"
            echo "📦 pnpm $(pnpm --version)"
            echo ""
            echo "Available commands:"
            echo "  pnpm dev     - Start development server"
            echo "  pnpm build   - Build for production"
            echo "  pnpm lint    - Run ESLint"
            echo "  pnpm start   - Start production server"
          '';
        };
      });
}
