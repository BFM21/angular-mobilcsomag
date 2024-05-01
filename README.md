# AngularMobilcsomag

## Hosting 

[https://angular-mobilcsomag.web.app/](https://angular-mobilcsomag.web.app/)

## Javítási segédlet:

@Input és @Outputok: nincs

Attríbutum direktívák: egy van a `src/app/directives` mappában

Strukturális direktívák:

- NgIf 
- NgFor  

A `src/app/pages/packages/packages.component.html`-ben mindkettő megtalálható

Használt Material elemek:

`Ctrl+Shift+F` és az elemhez tartozó html taggel könnyen kereshető. Ezeket ide kiírtam, hogy gyorsabban menjen.

1. SideNav - `mat-sidenav`
2. Button - `mat-flat-button`
3. Icon - `mat-icon`
4. Grid List - `mat-grid-list`
5. Card - `mat-card`
6. Dialog - `mat-dialog`
7. SnackBar - ennek nincs HTML tagje, mert egy service elem
8. FormField - `mat-form-field`
9. Input - ennek nincs HTML tagje, mert egy direktíva elem, de kereshető a `matInput` alapján
10. Toolbar - `mat-toolbar`

Fromok:

Formok találhatóak a regisztárció, bejelentkezés, profil oldalon valamint a felugró dialog ablakokban.

`src/app/pages/login`
`src/app/pages/register`
`src/app/pages/profile`
`src/app/dialogs`


Komplex Firestore lekérdezések:

Itt több ilyen lekérdezés is van: 
`\src\app\services\packages.service.ts`

Lifecycle Hook-ok:

`\src\app\app.component.ts`-ben van ngOnInit() és ngOnDestroy(), ezenkívü lmindenhol csak ngOnInit() van.

AuthGuard-dal védve van a Dashboard, Profil, és Saját csomagok oldal.