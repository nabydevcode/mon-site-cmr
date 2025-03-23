<?php

namespace App\Controller;

use App\Entity\Consignee;
use App\Form\ConsigneType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ConsigneController extends AbstractController
{
    #[Route('/consigne', name: 'app_consigne')]
    public function index(): Response
    {
        return $this->render(
            'consigne/index.html.twig'
        );
    }
    #[Route('/consigne/formulaire', name: 'consigne_formulaire')]
    public function formulaire(Request $request, EntityManagerInterface $em): Response
    {
        $consigne = new Consignee();
        $form = $this->createForm(ConsigneType::class, $consigne);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($consigne);
            $em->flush();
            return $this->redirectToRoute('app_consigne');
        }
        return $this->render('consigne/formulaire.html.twig', ['form' => $form->createView()]);
    }
}
