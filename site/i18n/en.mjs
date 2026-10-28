// English — source language. Inline markup: `code`, **bold**, {Key}, [label](/path-or-url).
export default {
  ui: {
    home: 'Remove Online – home',
    mainNav: 'Main',
    language: 'Language',
    menu: 'Menu',
    skip: 'Skip to content',
    tagline: 'Free tools and step-by-step guides for removing things online.',
    footerNav: 'Footer',
    privacy: 'Privacy',
    imprint: 'Imprint',
    homeCrumb: 'Home',
    h1: 'Remove anything online.',
    sub: 'Free tools and clear step-by-step guides.',
    lead: 'Remove a background, pages from a PDF or hidden photo data right in your browser, or follow a guide for accounts, files and code.',
    trust: 'No cookies, no tracking.',
    popular: 'Popular guides',
    topics: 'Topics',
    whyTitle: 'How these guides work',
    features: [
      { title: 'Built-in tools first', text: 'We start with what is already on your phone or computer, such as Preview, Photos, Word or your browser, before pointing you anywhere else.' },
      { title: 'Your files stay yours', text: 'No guide asks you to upload a private document to a random website, and this site itself has no cookies or tracking.' },
      { title: 'Plain, honest steps', text: 'Short numbered steps, the warning you need before you click, and a clear note when something cannot be undone.' },
    ],
    homeTitle: 'Remove Online – free tools and guides for removing things online',
    homeDescription: 'Free browser tools and guides: remove backgrounds, PDF pages, photo metadata, duplicate lines and more. No upload, no cookies, no tracking.',
    guideCount: (n) => `${n} guides`,
    warning: 'Warning',
    tip: 'Tip',
    faq: 'Questions',
    related: 'Related guides',
    goodToKnow: 'Good to know',
    disclaimer: 'General information, not legal or professional advice. Apps change their menus often, so a button may be named slightly differently on your version.',
    notFound: 'Page not found – go to the English site',
  },

  hubs: {
    accounts: { name: 'Accounts & devices', blurb: 'Sign out, remove and delete', lead: 'Remove an account from a phone, or delete it for good, without locking yourself out.' },
    privacy: { name: 'Privacy & personal data', blurb: 'Hide what you never meant to share', lead: 'Strip hidden data from photos and files, and get personal details out of search results.' },
    documents: { name: 'Documents & spreadsheets', blurb: 'PDF, Word, Excel and text', lead: 'Remove pages, passwords, duplicates and stray line breaks from the files you use every day.' },
    media: { name: 'Photos, video & audio', blurb: 'Backgrounds, objects, watermarks, sound', lead: 'Cut out backgrounds, erase objects and take the sound off a video, using tools you probably already have.' },
    developer: { name: 'Developer & command line', blurb: 'Git, Docker and Linux', lead: 'The commands for undoing a commit, cleaning up containers and deleting folders, with the safe variant first.' },
  },

  guides: {
    'remove-google-account-from-phone': {
      title: 'How to remove a Google account from your phone',
      short: 'Remove a Google account from your phone',
      lead: 'Removing the account signs it out of Gmail, Play Store, Contacts and Calendar on this device. It does **not** delete the account itself.',
      sections: [
        {
          h: 'On Android',
          steps: [
            'Open **Settings**.',
            'Tap **Passwords & accounts**. On some phones it is called **Accounts** or **Users & accounts**.',
            'Tap the Google account you want to remove.',
            'Tap **Remove account** and confirm.',
            'If asked, enter your screen lock PIN, pattern or password.',
          ],
        },
        {
          h: 'On iPhone or iPad',
          p: ['If you added the account in iOS settings (Apple Mail, Contacts, Calendar):'],
          steps: ['Open **Settings** and go to **Mail**, then **Mail Accounts**. On older iOS versions this is **Passwords & Accounts**.', 'Tap the Google account.', 'Tap **Delete Account** and confirm.'],
          after: ['If you only use the Gmail or Google app, tap your profile picture there and choose **Manage accounts on this device**, then remove the account. The wording differs a little between apps.'],
        },
      ],
      callout: { type: 'warning', text: 'Selling or giving away an Android phone? Remove your Google account **before** you reset it. Otherwise Factory Reset Protection can ask the next owner for your login.' },
      faq: [
        ['Does this delete my Google account?', 'No. The account and its data stay with Google. Only this phone loses access to it.'],
        ['Why is there no “Remove account” button?', 'A work or school account may be managed by your organisation, and only the administrator can remove it. On some phones the account is also tied to a work profile.'],
        ['Will I lose my photos and contacts?', 'Data stored in the account stays in the account. Items saved only on the phone, such as contacts stored locally, are not affected. Check your backup if you are unsure.'],
      ],
    },

    'delete-instagram-account': {
      title: 'How to delete your Instagram account',
      short: 'Delete your Instagram account',
      lead: 'Instagram lets you either **deactivate** an account (hidden, can come back) or **delete** it permanently. Deleting starts a countdown, so you can still change your mind.',
      sections: [
        {
          h: 'Delete the account in the app',
          steps: [
            'Open Instagram, go to your profile and tap the menu (☰).',
            'Tap **Accounts Center**, then **Personal details**.',
            'Tap **Account ownership and control**, then **Deactivation or deletion**.',
            'Choose the account, select **Delete account** and tap **Continue**.',
            'Pick a reason, enter your password and confirm.',
          ],
        },
        { h: 'Download your data first', p: ['In **Accounts Center**, open **Your information and permissions** and choose **Download your information**. After deletion your photos and messages cannot be recovered.'] },
        { h: 'What happens next', p: ['Instagram schedules the account for deletion and keeps it for a grace period (currently about 30 days). Logging in during that time cancels the deletion. Some copies in backups can take longer to disappear.'] },
      ],
      callout: { type: 'tip', text: 'Not sure? Choose **Deactivate** instead. Your profile, photos and likes are hidden until you log back in.' },
      faq: [
        ['Can I undo deleting my account?', 'Only during the grace period, by logging in again. After that the account and its content are gone.'],
        ['Will my username become free?', 'Once the deletion is complete the username can be taken by someone else. Deactivating keeps it reserved.'],
      ],
    },

    'remove-metadata-from-photos': {
      title: 'How to remove metadata (EXIF) from photos and documents',
      short: 'Remove metadata from photos',
      lead: 'Photos can carry hidden data: where they were taken, when, and with which device. Here is how to strip it before you share a file.',
      sections: [
        {
          h: 'Windows',
          steps: ['Right-click the photo and choose **Properties**.', 'Open the **Details** tab and click **Remove Properties and Personal Information**.', 'Select **Create a copy with all possible properties removed** and click **OK**.'],
        },
        {
          h: 'Mac',
          steps: ['Open the photo in **Preview**.', 'Choose **Tools**, then **Show Inspector**, and open the **GPS** tab.', 'Click **Remove Location Info**. This removes the location only, not camera details.'],
          after: ['In the Photos app you can also choose **File**, then **Export**, and untick **Location Information** before saving.'],
        },
        {
          h: 'iPhone',
          steps: ['Open the photo in **Photos** and tap the share button.', 'Tap **Options** at the top of the share sheet.', 'Switch off **Location** (or **All Photos Data**) and share as usual.'],
        },
        {
          h: 'Android',
          steps: ['Open the photo in Google Photos and swipe up to see its details.', 'Tap **Location** and choose **Remove location**.'],
        },
        { h: 'Office documents', p: ['In Word, Excel or PowerPoint choose **File**, **Info**, **Check for Issues**, **Inspect Document**, and then **Remove All** next to Document Properties and Personal Information.'] },
      ],
      callout: { type: 'tip', text: 'Many social networks strip location data when you upload, but e-mail attachments and cloud links usually keep everything. Remove it before you send.' },
      faq: [
        ['What exactly is in a photo’s metadata?', 'Typically date and time, camera or phone model, settings, and often GPS coordinates. Editing software can add its own name too.'],
        ['Does a screenshot remove metadata?', 'A screenshot gets new metadata of its own and does not carry the original location. It is a quick workaround, but the image quality is lower.'],
      ],
    },

    'remove-personal-info-from-google': {
      title: 'How to remove personal information from Google search results',
      short: 'Remove personal info from Google',
      lead: 'You can ask Google to stop showing results that contain your address, phone number or similar details. The page itself stays online unless you also contact its owner.',
      sections: [
        {
          h: 'Steps',
          steps: [
            'Search for your name, address and phone number to see what is visible today.',
            'Open Google’s **Results about you** tool: [support.google.com/websearch/answer/12719076](https://support.google.com/websearch/answer/12719076). In the Google app you find it under your profile picture.',
            'Add the contact details you want monitored, then review the results it finds.',
            'Next to a result, open the menu (⋮) and choose **Remove result**, then follow the questions.',
            'If a result is not covered, use Google’s “Remove information from Google” help form and describe the page.',
          ],
        },
        { h: 'Remove it at the source', p: ['Google only hides the result. To get the content off the internet, ask the website owner or host to delete the page. Once it is gone, the search result disappears too.'] },
        { h: 'If you live in the EU or UK', p: ['You can also invoke your right to erasure (GDPR Article 17, “right to be forgotten”) through Google’s legal removal form for Europe. Google weighs your privacy against the public interest and may refuse.'] },
      ],
      callout: { type: 'warning', text: 'Keep the confirmation e-mails and links to the pages you reported. You will need them if you have to appeal a decision.' },
      faq: [
        ['How long does it take?', 'Google reviews each request, and the time varies. You get an e-mail when a decision is made.'],
        ['What about Bing and other search engines?', 'Each search engine has its own removal form. Removing a result from Google does not remove it from them.'],
      ],
    },

    'remove-pages-from-pdf': {
      title: 'How to remove pages from a PDF',
      short: 'Remove pages from a PDF',
      lead: 'You do not need to install anything or upload a document. Your Mac, your browser or Adobe Acrobat can delete pages from a PDF directly.',
      sections: [
        {
          h: 'On a Mac with Preview',
          steps: ['Open the PDF in **Preview**.', 'Choose **View**, then **Thumbnails**.', 'Click the page you want to delete (hold {⌘} to select several).', 'Press {Delete}, then save with {⌘} + {S}.'],
        },
        {
          h: 'On Windows, Mac or Linux with Chrome or Edge',
          steps: ['Open the PDF in your browser and press {Ctrl} + {P} ({⌘} + {P} on a Mac).', 'As destination choose **Save as PDF**.', 'Under **Pages** choose **Custom** and enter the pages you want to **keep**, for example `1-3, 5-8`.', 'Click **Save**. The result is a new file; your original stays untouched.'],
        },
        {
          h: 'In Adobe Acrobat',
          steps: ['Choose **Tools**, then **Organize Pages**.', 'Select the thumbnails you do not want and click the trash icon.', 'Save the file.'],
        },
      ],
      callout: { type: 'tip', text: 'Saving through the print dialog is the fastest way, but it can drop links, bookmarks and form fields. For those, use Preview or Acrobat.' },
      faq: [
        ['Is it safe to use a website for this?', 'Free web tools upload your file to their server. For contracts, IDs or anything private, use one of the offline methods above.'],
        ['Can I remove a page from a protected PDF?', 'Not until it is unlocked. See [how to remove a password from a PDF](/documents/remove-password-from-pdf/).'],
      ],
    },

    'remove-password-from-pdf': {
      title: 'How to remove a password from a PDF',
      short: 'Remove a password from a PDF',
      lead: 'If you know the password and are allowed to open the file, you can save an unlocked copy so you no longer have to type it.',
      sections: [
        {
          h: 'With Chrome or Edge',
          steps: ['Open the PDF in the browser and enter the password.', 'Press {Ctrl} + {P} ({⌘} + {P} on a Mac).', 'Choose **Save as PDF** as the destination and click **Save**.', 'The new file opens without a password.'],
        },
        {
          h: 'With Preview on a Mac',
          steps: ['Open the PDF and enter the password.', 'Choose **File**, then **Export as PDF…** and save a copy.'],
        },
        {
          h: 'With Adobe Acrobat',
          steps: ['Open the PDF and enter the password.', 'Choose **File**, then **Properties**, and open the **Security** tab.', 'Set **Security Method** to **No Security**, click **OK** and save.'],
        },
      ],
      callout: { type: 'warning', text: 'This only works when you know the password. A forgotten password cannot be recovered. Ask the person who created or sent the file. Do not remove restrictions from documents you have no right to use.' },
      faq: [
        ['What is the difference between the two kinds of PDF password?', 'A **document open password** is needed to view the file. A **permissions password** only restricts printing or copying. The steps above start from a file you can already open.'],
        ['Does the new copy look the same?', 'Printing to PDF can drop bookmarks and form fields. Preview and Acrobat keep them.'],
      ],
    },

    'remove-page-from-word': {
      title: 'How to delete a page in Word',
      short: 'Delete a page in Word',
      lead: 'Select everything on the page and delete it. If the page is blank and will not go away, a hidden paragraph mark or page break is usually the cause.',
      sections: [
        {
          h: 'Delete a page with content',
          steps: ['Click anywhere on the page you want to delete.', 'Press {Ctrl} + {G} (Mac: {⌥} + {⌘} + {G}) to open **Go To**.', 'Type `\\page` and press {Enter}, then **Close**. The whole page is selected.', 'Press {Delete}.'],
        },
        {
          h: 'Delete a blank page at the end',
          steps: ['Press {Ctrl} + {Shift} + {8} (Mac: {⌘} + {8}) to show paragraph marks (¶).', 'Select the extra paragraph marks or the **Page Break** line on the blank page.', 'Press {Delete} until the page is gone.'],
          after: ['If the blank page follows a table, the last paragraph mark cannot be deleted. Select it and set the font size to 1 pt, or hide it with {Ctrl} + {D}, **Hidden**.'],
        },
        { h: 'In Google Docs', p: ['Select the text on the page and press {Delete}. If a blank page remains, check **Insert**, **Break** for an unwanted page break, or reduce the spacing before the final paragraph.'] },
      ],
      callout: { type: 'tip', text: 'Before you delete, save a copy. Undo ({Ctrl} + {Z}) also brings the page back.' },
      faq: [
        ['Why does a blank page appear before my table?', 'Word needs a paragraph after a table. If the table ends exactly at the bottom of a page, that paragraph moves to the next page.'],
        ['Will deleting a page change the page numbers?', 'Yes. The following pages move up and numbering updates automatically.'],
      ],
    },

    'remove-duplicates-in-excel': {
      title: 'How to remove duplicates in Excel',
      short: 'Remove duplicates in Excel',
      lead: 'Excel can delete duplicate rows in two clicks, or keep your original list intact and show a clean copy.',
      sections: [
        {
          h: 'Delete duplicate rows',
          steps: ['Click a cell inside your data (or select the range).', 'Open the **Data** tab and click **Remove Duplicates**.', 'Tick the columns that must match for a row to count as a duplicate.', 'Click **OK**. Excel tells you how many duplicates were removed.'],
        },
        {
          h: 'Keep the original (Microsoft 365)',
          p: ['The UNIQUE function returns a de-duplicated list without touching your data:'],
          code: '=UNIQUE(A2:A100)',
        },
        {
          h: 'Find duplicates before deleting',
          steps: ['Select the column.', 'Choose **Home**, **Conditional Formatting**, **Highlight Cells Rules**, **Duplicate Values**.', 'Review the highlighted cells.'],
        },
        { h: 'In Google Sheets', p: ['Select the range and choose **Data**, **Data cleanup**, **Remove duplicates**.'] },
      ],
      callout: { type: 'warning', text: '“Remove Duplicates” deletes rows immediately. Work on a copy of the sheet, or press {Ctrl} + {Z} straight away if the result is wrong.' },
      faq: [
        ['Why are “identical” cells not treated as duplicates?', 'Trailing spaces and different capitalisation can make cells differ. Clean them with `=TRIM(A2)` first.'],
        ['Does it keep the first or last entry?', 'Excel keeps the first occurrence and removes the later ones.'],
      ],
    },

    'remove-line-breaks': {
      title: 'How to remove line breaks from text, Word and Excel',
      short: 'Remove line breaks',
      lead: 'Copied a block of text with a hard return at the end of every line? Replace those line breaks with a space in a few seconds.',
      sections: [
        {
          h: 'In Word',
          steps: ['Press {Ctrl} + {H} to open **Find and Replace**.', 'Click **More >>**, then **Special**, then **Paragraph Mark**. This enters `^p`.', 'Leave **Replace with** as a single space.', 'Click **Replace All**.'],
        },
        {
          h: 'In Excel',
          steps: ['Select the cells and press {Ctrl} + {H}.', 'Click in **Find what** and press {Ctrl} + {J}. A tiny dot appears.', 'Type a space in **Replace with** and click **Replace All**.'],
          p: ['Or use a formula in a helper column:'],
          code: '=SUBSTITUTE(A1,CHAR(10)," ")',
        },
        {
          h: 'In any editor with regular expressions',
          p: ['Turn on “regex” in Find and Replace, search for the pattern below and replace it with a space:'],
          code: '\\r?\\n',
        },
      ],
      callout: { type: 'tip', text: 'To keep paragraphs but fix broken lines, replace a single line break and leave blank lines alone. Search for two breaks first, swap them for a placeholder, then restore them afterwards.' },
      faq: [
        ['What is the difference between a line break and a paragraph mark?', 'In Word, {Shift} + {Enter} adds a line break (`^l`), {Enter} adds a paragraph mark (`^p`). Search for the one you actually have.'],
        ['Can I remove empty lines too?', 'Yes. Replace two paragraph marks (`^p^p`) with one (`^p`) and repeat until nothing is found.'],
      ],
    },

    'remove-background-from-image': {
      title: 'How to remove the background from an image',
      short: 'Remove the background from an image',
      lead: 'Most phones and office programs can now cut out a subject on their own. Save the result as a PNG to keep the transparent background.',
      sections: [
        {
          h: 'iPhone and iPad',
          steps: ['Open the photo in **Photos**.', 'Touch and hold the subject until it glows.', 'Tap **Copy** or **Share**, then paste into Notes, Messages or an editing app. Needs iOS 16 or newer.'],
        },
        {
          h: 'Mac',
          steps: ['Open the picture in **Preview** and choose **Tools**, then **Remove Background**. On newer macOS versions you can also right-click the file in Finder and choose **Quick Actions**, **Remove Background**.'],
        },
        {
          h: 'Windows',
          steps: ['Open the picture in **Paint**.', 'Click **Remove background** in the Image group.', 'Save as PNG.'],
        },
        {
          h: 'Word, PowerPoint and Excel',
          steps: ['Click the picture, then **Picture Format**, then **Remove Background**.', 'Mark areas to keep or remove, then choose **Keep Changes**.'],
        },
      ],
      callout: { type: 'tip', text: 'Photos with a clear contrast between subject and background work best. Fine details such as hair may need touching up by hand.' },
      faq: [
        ['Which file format keeps the transparency?', 'PNG (or WebP). JPG cannot store transparency and fills the area with white.'],
        ['Is it safe to use an online background remover?', 'Most upload your picture to their servers. For private or client photos, prefer the built-in tools above.'],
      ],
    },

    'remove-object-from-photo': {
      title: 'How to remove an object or person from a photo',
      short: 'Remove an object from a photo',
      lead: 'Phone galleries now include an eraser that fills in the gap automatically. Here is where to find it and how to get a clean result.',
      sections: [
        {
          h: 'Where to find the eraser',
          p: ['Wording and availability depend on your phone, system version and region.'],
          steps: [
            '**Google Photos:** open the photo, tap **Edit**, then **Tools**, then **Magic Eraser**.',
            '**Samsung Galaxy:** open the photo in Gallery, tap the pencil, then the **Object eraser** option.',
            '**iPhone:** on models with Apple Intelligence, tap **Edit** in Photos and choose **Clean Up**.',
            '**Windows:** on supported PCs, the Photos app offers **Generative erase**.',
            '**Photoshop:** use the **Remove tool** or **Generative Fill**.',
          ],
        },
        { h: 'How to get a clean result', steps: ['Zoom in and brush or circle the object, including its shadow.', 'Remove small things first. Large objects in front of busy backgrounds are hard to fill convincingly.', 'Apply, check the edges, and undo if the fill looks smeared.'] },
        { h: 'Free option on a computer', p: ['GIMP is free and has a **Heal** tool and a Resynthesizer plugin for filling gaps. It needs more manual work than a phone eraser.'] },
      ],
      callout: { type: 'warning', text: 'Edit your own pictures or ones you have permission to change. Removing people or objects to mislead others, for example in evidence or news photos, is not acceptable.' },
      faq: [
        ['Does the original photo stay?', 'Most apps save the edit as a copy or let you revert. Check before you overwrite.'],
        ['Why does the result look blurry?', 'The tool has to invent the missing pixels. Simple backgrounds like sky, grass or walls work best.'],
      ],
    },

    'remove-audio-from-video': {
      title: 'How to remove the sound from a video',
      short: 'Remove the sound from a video',
      lead: 'Mute a video for good, so that the exported file has no audio track, with your phone or a free tool.',
      sections: [
        {
          h: 'iPhone',
          steps: ['Open the video in **Photos** and tap **Edit**.', 'Tap the yellow speaker icon at the top left so it is crossed out.', 'Tap **Done**.'],
        },
        {
          h: 'Android (Google Photos)',
          steps: ['Open the video and tap **Edit**.', 'Tap the speaker icon to mute the audio.', 'Tap **Save copy**.'],
        },
        {
          h: 'Mac (iMovie)',
          steps: ['Drag the clip onto the timeline.', 'Choose **Modify**, then **Detach Audio**.', 'Select the green audio bar and press {Delete}, then export.'],
        },
        {
          h: 'Command line (FFmpeg)',
          p: ['This copies the picture without re-encoding it and drops the audio:'],
          code: 'ffmpeg -i input.mp4 -c copy -an output.mp4',
        },
      ],
      callout: { type: 'tip', text: 'Muting in the player only silences playback. To share a video with no sound at all, export a new file as described above.' },
      faq: [
        ['Will the video quality change?', 'With the FFmpeg command above, no. Phone editors may re-encode the video slightly.'],
        ['Can I replace the audio instead?', 'Yes. Remove the original track first, then add music or a voice-over in the same editor.'],
      ],
    },

    'remove-watermark': {
      title: 'How to remove a watermark (legally)',
      short: 'Remove a watermark',
      lead: 'Removing a watermark from your **own** document or from a trial export is fine. Removing someone else’s from an image or video usually is not. Here is what works and what to do instead.',
      sections: [
        {
          h: 'Watermarks in your own Word document',
          steps: ['Open the **Design** tab.', 'Click **Watermark**.', 'Choose **Remove Watermark**.'],
        },
        {
          h: 'Watermarks in your own PDF',
          steps: ['Open the PDF in Adobe Acrobat.', 'Choose **Edit PDF**, then **Watermark**, then **Remove**.'],
        },
        {
          h: 'Watermarks added by an app or trial',
          p: ['Video editors, design apps and conversion tools often add a logo on the free plan. The clean way to lose it is to upgrade, use the paid export, or re-export from the original project in an app that does not add a mark.'],
        },
        {
          h: 'A photo or video that belongs to someone else',
          p: ['A watermark identifies the owner. Do not crop it out or paint it over. Instead:'],
          steps: ['Ask the owner for a clean copy or permission.', 'Buy a licence for the unwatermarked version from the stock site.', 'Use images that are free to use, such as Wikimedia Commons or other public-domain and Creative Commons sources, and credit them as required.'],
        },
      ],
      callout: { type: 'warning', text: 'In many countries, removing copyright information such as a watermark can be illegal, for example under § 95c of the German copyright act or § 1202 of the US DMCA, or Article 7 of EU Directive 2001/29/EC. This is general information, not legal advice.' },
      faq: [
        ['Can I remove an AI watermark or label?', 'Labels that mark content as AI-generated exist so that others are not misled. We do not describe how to hide them.'],
        ['What if I lost the original file without the watermark?', 'Check your cloud backup, your sent mail or the app’s export history. If you only have a watermarked copy of your own work, contact the tool’s support.'],
      ],
    },

    'remove-last-git-commit': {
      title: 'How to remove the last commit in Git',
      short: 'Remove the last Git commit',
      lead: 'The right command depends on one question: did you already push the commit? Start with the safe options.',
      sections: [
        {
          h: 'Not pushed yet: undo the commit, keep your changes',
          code: 'git reset --soft HEAD~1',
          after: ['The commit is gone, and its changes are staged again. Use `git reset HEAD~1` to unstage them as well.'],
        },
        {
          h: 'Not pushed yet: undo the commit and throw the changes away',
          code: 'git reset --hard HEAD~1',
        },
        {
          h: 'Already pushed to a shared branch',
          p: ['Create a new commit that reverses the old one. History stays intact for everyone:'],
          code: 'git revert HEAD\ngit push',
        },
        {
          h: 'Only the message is wrong',
          code: 'git commit --amend',
        },
        {
          h: 'Rewriting a pushed branch you own',
          p: ['Only if nobody else uses the branch:'],
          code: 'git reset --hard HEAD~1\ngit push --force-with-lease',
        },
      ],
      callout: { type: 'warning', text: '`--hard` deletes uncommitted work. If you remove a commit by mistake, `git reflog` lists recent states, and `git reset --hard <hash>` takes you back.' },
      faq: [
        ['What does HEAD~1 mean?', 'It points to the commit before the current one. `HEAD~3` goes back three commits.'],
        ['Why is force-pushing risky?', 'It overwrites the remote history. Teammates who already pulled the old commit will run into conflicts.'],
      ],
    },

    'remove-docker-images-and-containers': {
      title: 'How to remove Docker images and containers',
      short: 'Remove Docker images and containers',
      lead: 'Stop and remove containers first, then images. Prune commands clean up in bulk, so read what they will delete.',
      sections: [
        {
          h: 'Remove a container',
          code: 'docker ps -a\ndocker stop <container>\ndocker rm <container>',
          after: ['Use `docker rm -f <container>` to stop and remove a running container in one step.'],
        },
        {
          h: 'Remove an image',
          code: 'docker images\ndocker rmi <image>',
          after: ['Docker refuses to remove an image that a container still uses, so remove that container first.'],
        },
        {
          h: 'Clean up in bulk',
          code: 'docker container prune\ndocker image prune\ndocker system prune',
          after: ['`docker system prune` removes stopped containers, unused networks, dangling images and build cache. Add `-a` to remove all unused images, and `--volumes` to include volumes.'],
        },
      ],
      callout: { type: 'warning', text: 'Volumes hold data such as databases. They are not removed unless you ask for it with `--volumes`, and that cannot be undone.' },
      faq: [
        ['What is a dangling image?', 'An image without a tag, usually left behind when you rebuild an image under the same name.'],
        ['How do I remove everything?', 'Run `docker rm -f $(docker ps -aq)` for all containers, then `docker rmi $(docker images -q)` for all images. Check the lists first.'],
      ],
    },

    'remove-directory-linux': {
      title: 'How to remove a directory in Linux',
      short: 'Remove a directory in Linux',
      lead: 'There is no recycle bin on the command line. Know which command you need, and check the path before you press Enter.',
      sections: [
        { h: 'An empty directory', code: 'rmdir myfolder' },
        { h: 'A directory with files in it', code: 'rm -r myfolder', after: ['Add `-i` to be asked before every deletion: `rm -ri myfolder`.'] },
        { h: 'Without any prompts', code: 'rm -rf myfolder', after: ['`-f` skips questions and ignores missing files. Use it only when you are sure.'] },
        { h: 'Delete matching folders everywhere', p: ['For example, every `node_modules` folder below the current directory (preview with `-print` first):'], code: 'find . -name node_modules -type d -prune -print\nfind . -name node_modules -type d -prune -exec rm -rf {} +' },
      ],
      callout: { type: 'warning', text: 'Never run `rm -rf /` or paste a command you do not understand. A stray space, as in `rm -rf / home`, changes the meaning completely. Run `ls` on the path first.' },
      faq: [
        ['Why do I get “Permission denied”?', 'You do not own the directory. Check with `ls -ld myfolder`. Use `sudo` only if you are certain the path is right.'],
        ['Can I get the files back?', 'Usually not. Deleted files do not go to a trash folder. Restore from a backup.'],
      ],
    },
  },

  privacy: {
    title: 'Privacy',
    lead: 'Short version: this website is a set of static pages. It has no accounts, no cookies and no analytics.',
    sections: [
      {
        h: '1. Visiting the website',
        p: [
          'The website is a set of static files hosted on GitHub Pages, a service of GitHub, Inc. (USA). When you load a page, your browser sends a request to GitHub’s servers. Like any web server, GitHub processes technical data to deliver the page and keep the service secure, in particular your IP address, the requested address, date and time, and your browser’s user agent. GitHub may store this data in server logs. We have no access to these logs and do not use them.',
          'This processing is necessary to deliver the website and is based on our legitimate interest in providing a working and secure site (Art. 6(1)(f) GDPR). GitHub may process data in the USA. More information is available in the [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).',
        ],
      },
      {
        h: '2. No cookies or analytics',
        p: ['Remove Online does not set cookies, does not use analytics or tracking tools and has no user accounts. Fonts and all code are served from the site itself; no content delivery networks or third-party services are contacted. The site contains no forms and does not ask for any personal data.'],
      },
      {
        h: '3. Links to other sites',
        p: ['Guides link to other websites, for example to Google’s help pages. When you follow such a link, the other site’s privacy policy applies. We have no influence on their data processing.'],
      },
      {
        h: '4. Contact and your rights',
        p: [
          'The party responsible for this website is listed in the [imprint](/imprint/). You can reach us at {EMAIL}.',
          'Under the GDPR you have the right to access, rectification, erasure and restriction of processing of your personal data, the right to data portability and the right to object to processing based on legitimate interests. You also have the right to lodge a complaint with a data protection supervisory authority. Since Remove Online itself does not collect personal data, requests concerning hosting logs may have to be directed to GitHub.',
        ],
      },
    ],
    updated: 'Last updated: 28 October 2026',
  },

  imprint: {
    title: 'Imprint',
    lead: 'Information about the provider of this website according to German law.',
    country: 'Germany',
    contact: 'Kontakt / Contact',
    emailLabel: 'E-Mail',
    guidesTitle: 'About the guides',
    guides: 'The guides give general information and are not legal or professional advice. Apps and websites of third parties change their menus often; if a step looks different, check the provider’s own help pages.',
  },
};
