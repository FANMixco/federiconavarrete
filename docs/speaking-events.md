# Speaking and Events source audit

The portfolio’s existing Presentations section links to [Speaking & Events](https://federiconavarrete.com/pages/speaking.html). The profile loads English, Spanish, French or Chinese using the portfolio’s existing `?lang=` and browser-language selection. The existing portfolio carousel and presentation gallery remain available from their original locations.

## Sources reviewed

The [inventory](speaking-inventory.json) identifies each source entry by repository, file and JSON pointer. It includes the entire 36-entry `seenOn` carousel, the additional presentations, training videos, organized events, awards and press sections in `extraInfo.json`, and the Timeless Stories institutional, press and collaboration records. `shared.*` references are resolved against `js/data/links.json`. The audit retains the original references and the redirects observed while reviewing them.

The source check used the local portfolio checkout at `61c7e24bd69d2a33ff092b3a5904e2880ad60cae` and Timeless Stories at `f5222fc3f4dfec3e88c39070dc2d0c9dc702bf5e`. Both repositories carry English, Spanish, French and Chinese content. Official titles and institution names in the event data retain their source wording. A page’s interface language was insufficient to establish the language of a presentation.

The [normalized dataset](../js/data/speaking-events.json) reconciles 90 source references into 43 records plus institutional context. Sixteen records meet the threshold for appearing in the archive, including six featured engagements. Nineteen are partial and eight are unverified. `verified` confirms that the evidence supports the displayed role and wording. An organizer’s programme establishes a scheduled role. It does not establish that a session took place when no post-event account was found.

## Reconciliation and review

| Record | Decision |
| --- | --- |
| New Delhi and Istanbul | Merged the portfolio carousel, Instituto Cervantes listings, and related Timeless Stories coverage. Istanbul’s press note is dated 11 October 2023 and describes Federico’s session as taking place the next day. |
| Marrakech and Rabat | Kept the named 5 May presentation at Instituto Cervantes Marrakech separate from the SIEL fair in Rabat. Coverage documents the book at the fair and does not establish a speaking role there. |
| Buch Wien | The publisher’s archived programme identifies Federico for a reading and conversation. The Cervantes listing names him as a participant in a separate item with overlapping times. The archive displays the attributed reading. The other listing remains partial. |
| Citython | The Citython, Smart City and IST World Congress carousel entries share one Hamburg winner announcement. Eindhoven has its own organizer programme and pitch recording. No separate speaking record was inferred from the repeated Hamburg link. |
| Madrid and Cisco | Consolidated repeated mentions into one Madrid Book Fair appearance and one Switch Up Challenge award, retaining separate press and institutional evidence in each record. |
| IEEE and Beijing | The IEEE agenda names Federico Navarrete, but the speaker panel names Federico Machado. Beijing’s programme names the book and its timeslot but omits the presenter. Both are held for confirmation. |
| FOCUS on FinOps | The speaker’s public account identifies his role. Organizing-team accounts corroborate the event, date, and venue. The individual session title was unavailable. |
| Files, news, and role gaps | OneDrive links, gated institutional notices, some social pages, and unrelated redirects yielded insufficient evidence for a role in several records. Standalone slide decks and training videos were inventoried without inferring event participation. |

## Adding an appearance

1. Search `js/data/speaking-events.json` for the event, date and organizer before creating a new record. Add new provenance to a matching record, or use a stable, unique identifier for a new one.
2. Record the original link and its resolved destination. Cite the page or recording that supports the person’s role. Prefer organizer or institutional material. Keep unavailable fields `null` or empty, and record conflicts in `reviewNote`.
3. Assign `verified`, `partial`, or `unverified`. The public archive displays only `verified` rows. Set `speaking` for an evidenced speaking role and `featured` for selected speaking engagements. A verified award, profile, or participation record can be listed in the archive with its own role.
4. Keep official titles in the source language. Add any custom descriptions in the same record under `description.en`, `.es`, `.fr`, and `.zh`. Add a verified recording URL when available. Use an existing relevant WebP thumbnail or book cover and add localized descriptive alt text when a generic source label is insufficient.
5. Update the source inventory for material from the two repositories. The carousel and portfolio presentation lists retain their existing data independently because they serve different purposes. The speaking profile uses the normalized dataset as its source of truth and does not run an automatic publication import.
