--
-- Base de données : `bdboutique`
--
CREATE DATABASE IF NOT EXISTS `bdboutique` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `bdboutique`;

-- --------------------------------------------------------
--
-- Structure de la table `articles`
--
CREATE TABLE `articles` (
  `ida` int(11) NOT NULL,
  `nomarticle` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `imageart` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `categorie` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `qteinventaire` int(11) NOT NULL,
  `seuil` int(11) NOT NULL,
  `prix` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------
--
-- Structure de la table `categories`
--
CREATE TABLE `categories` (
  `idcateg` int(11) NOT NULL,
  `categ` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`idcateg`, `categ`) VALUES
(1, 'Articles de bureau'),
(2, 'Imprimantes'),
(3, 'Meubles'),
(4, 'Ordinateurs'),
(5, 'Appareils photo'),
(6, 'Photocopieurs'),
(7, 'Toutes');

-- --------------------------------------------------------
--
-- Structure de la table `membres`
--
CREATE TABLE `membres` (
  `idm` int(11),
  `prenom` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `nom` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `courriel` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `sexe` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `datenaissance` date DEFAULT NULL,
  CONSTRAINT membres_idm_PK PRIMARY KEY(idm)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `membres` (`idm`, `prenom`, `nom`, `courriel`, `sexe`, `datenaissance`) VALUES
(1, 'James', 'Bond', 'admin@boutique.com', 'M', '1968-02-16');
ALTER TABLE `membres`
  MODIFY `idm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Structure de la table `connexion`
--
CREATE TABLE `connexion` (
  `idc` int(11) NOT NULL,
  `courriel` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(1) COLLATE utf8_unicode_ci DEFAULT 'M',
  `statut` varchar(1) COLLATE utf8_unicode_ci DEFAULT 'A',
  CONSTRAINT connexion_idc_FK FOREIGN KEY(idc) REFERENCES membres(idm)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
--
-- Déchargement des données de la table `connexion`
--

INSERT INTO `connexion` (`idc`, `courriel`, `pass`, `role`, `statut`) VALUES
(1, 'admin@boutique.com', '12345', 'A', 'A');

--
-- Structure de la table `films`
--

CREATE TABLE `films` (
  `id` int(11),
  `titre` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `duree` int(11) NOT NULL,
  `annee` int(11) NOT NULL,
  `realisateur` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `pochette` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  CONSTRAINT films_id_PK PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`ida`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`idcateg`);

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `ida` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `idcateg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `films`
--
ALTER TABLE `films`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
